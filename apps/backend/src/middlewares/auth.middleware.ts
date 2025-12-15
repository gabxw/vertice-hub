import { Response, NextFunction } from 'express';
import { supabase } from '../config/supabase';
import { logger } from '../config/logger';
import { AuthRequest } from '@/types';
import { Role } from '@prisma/client';

/**
 * Authenticate user middleware using Supabase Auth
 */
export async function authenticate(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Token de autenticação não fornecido',
      });
    }

    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Formato de token inválido',
      });
    }

    // Validar token do Supabase
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      logger.warn('Token inválido ou expirado', { error: error?.message });
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Token inválido ou expirado',
      });
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
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'Erro interno no servidor',
    });
  }
}

/**
 * Authorize user by role
 */
export function authorize(...roles: Role[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Usuário não autenticado',
      });
    }

    if (!roles.includes(req.user.role)) {
      logger.warn('Acesso negado - role insuficiente', { 
        userId: req.user.id,
        userRole: req.user.role,
        requiredRoles: roles 
      });
      
      return res.status(403).json({
        error: 'Forbidden',
        message: 'Você não tem permissão para acessar este recurso',
      });
    }

    next();
  };
}

/**
 * Optional authentication (doesn't fail if no token)
 */
export async function optionalAuth(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return next();
    }

    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      return next();
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
