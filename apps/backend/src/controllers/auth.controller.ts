import { Request, Response } from 'express';
import { authService } from '@/services/auth.service';
import { AuthRequest } from '@/types';
import type {
  RegisterInput,
  LoginInput,
  RefreshTokenInput,
  ForgotPasswordInput,
  ResetPasswordInput,
} from '@/validators/auth.validator';

export class AuthController {
  /**
   * Register new user
   */
  async register(req: Request<{}, {}, RegisterInput>, res: Response) {
    try {
      const result = await authService.register(req.body);

      res.status(201).json({
        success: true,
        message: 'Usuário cadastrado com sucesso',
        data: result,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: 'Registration Error',
        message: error.message,
      });
    }
  }

  /**
   * Login user
   */
  async login(req: Request<{}, {}, LoginInput>, res: Response) {
    try {
      const result = await authService.login(req.body);

      res.json({
        success: true,
        message: 'Login realizado com sucesso',
        data: result,
      });
    } catch (error: any) {
      res.status(401).json({
        success: false,
        error: 'Login Error',
        message: error.message,
      });
    }
  }

  /**
   * Refresh access token
   */
  async refresh(req: Request<{}, {}, RefreshTokenInput>, res: Response) {
    try {
      const result = await authService.refreshAccessToken(req.body.refreshToken);

      res.json({
        success: true,
        message: 'Token renovado com sucesso',
        data: result,
      });
    } catch (error: any) {
      res.status(401).json({
        success: false,
        error: 'Refresh Error',
        message: error.message,
      });
    }
  }

  /**
   * Logout user
   */
  async logout(req: Request<{}, {}, RefreshTokenInput>, res: Response) {
    try {
      await authService.logout(req.body.refreshToken);

      res.json({
        success: true,
        message: 'Logout realizado com sucesso',
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: 'Logout Error',
        message: error.message,
      });
    }
  }

  /**
   * Request password reset
   */
  async forgotPassword(req: Request<{}, {}, ForgotPasswordInput>, res: Response) {
    try {
      const result = await authService.forgotPassword(req.body.email);

      res.json({
        success: true,
        message: 'Se o email existir, você receberá um link para redefinir sua senha',
        data: result,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: 'Forgot Password Error',
        message: error.message,
      });
    }
  }

  /**
   * Reset password
   */
  async resetPassword(req: Request<{}, {}, ResetPasswordInput>, res: Response) {
    try {
      const result = await authService.resetPassword(req.body.token, req.body.password);

      res.json({
        success: true,
        message: 'Senha redefinida com sucesso',
        data: result,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: 'Reset Password Error',
        message: error.message,
      });
    }
  }

  /**
   * Get current user
   */
  async me(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: 'Unauthorized',
          message: 'Usuário não autenticado',
        });
      }

      res.json({
        success: true,
        data: req.user,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: 'Error',
        message: error.message,
      });
    }
  }
}

export const authController = new AuthController();
