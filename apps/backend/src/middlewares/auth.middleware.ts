import { Response, NextFunction } from 'express';
import { supabase } from '../config/supabase';
import { logger } from '../config/logger';
import { AuthRequest } from '../types';
import { Role } from '@prisma/client';

/**
 * Authenticate user middleware using Supabase Auth
 */
export async function authenticate(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const authHeader = req.headers.authorization;

    logger.debug('Auth middleware - checking authorization', {
      path: req.path,
      method: req.method,
      hasAuthHeader: !!authHeader,
      headers: Object.keys(req.headers)
    });

    if (!authHeader) {
      logger.warn('No authorization header found');
      res.status(401).json({
        error: 'Unauthorized',
        message: 'Token de autenticação não fornecido',
      });
      return;
    }

    const [bearer, token] = authHeader.split(' ');

    logger.debug('Auth header parsed', {
      bearer,
      tokenLength: token?.length,
      tokenPreview: token?.substring(0, 20) + '...'
    });

    if (bearer !== 'Bearer' || !token) {
      logger.warn('Invalid token format', { bearer, hasToken: !!token });
      res.status(401).json({
        error: 'Unauthorized',
        message: 'Formato de token inválido',
      });
      return;
    }

    // Validar token do Supabase
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      logger.warn('Token inválido ou expirado', { error: error?.message });
      res.status(401).json({
        error: 'Unauthorized',
        message: 'Token inválido ou expirado',
      });
      return;
    }

    // Buscar role do usuário (pode estar nos metadados)
    const role = (user.user_metadata?.role || user.app_metadata?.role || 'CUSTOMER') as Role;

    req.user = {
      id: user.id,
      email: user.email!,
      role: role,
    };

    logger.debug('Usuário autenticado', { 
      userId: user.id, 
      email: user.email,
      role: role 
    });

    next();
  } catch (error) {
    logger.error('Erro na autenticação', { error });
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Erro interno no servidor',
    });
  }
}

/**
 * Authorize user by role
 */
export function authorize(...roles: Role[]) {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        error: 'Unauthorized',
        message: 'Usuário não autenticado',
      });
      return;
    }

    if (!roles.includes(req.user.role)) {
      logger.warn('Acesso negado - role insuficiente', { 
        userId: req.user.id,
        userRole: req.user.role,
        requiredRoles: roles 
      });
      
      res.status(403).json({
        error: 'Forbidden',
        message: 'Você não tem permissão para acessar este recurso',
      });
      return;
    }

    next();
  };
}

/**
 * Optional authentication (doesn't fail if no token)
 */
export async function optionalAuth(req: AuthRequest, _res: Response, next: NextFunction): Promise<void> {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      next();
      return;
    }

    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      next();
      return;
    }

    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (!error && user) {
      const role = (user.user_metadata?.role || user.app_metadata?.role || 'CUSTOMER') as Role;
      req.user = {
        id: user.id,
        email: user.email!,
        role: role,
      };
    }

    next();
  } catch (error) {
    // Continue without authentication
    logger.debug('Erro ao verificar token opcional', { error });
    next();
  }
}
