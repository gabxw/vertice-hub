import { Request, Response } from 'express';
import { userService } from '../services/user.service';
import { AuthRequest } from '../types';
import type { UpdateProfileInput, CreateAddressInput, UpdateAddressInput } from '../validators/user.validator';

export class UserController {
  /**
   * Get user profile
   */
  async getProfile(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: 'Unauthorized',
          message: 'Usuário não autenticado',
        });
      }

      const user = await userService.getProfile(req.user.id);

      res.json({
        success: true,
        data: user,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: 'Error',
        message: error.message,
      });
    }
  }

  /**
   * Update user profile
   */
  async updateProfile(req: AuthRequest<{}, {}, UpdateProfileInput>, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: 'Unauthorized',
          message: 'Usuário não autenticado',
        });
      }

      const user = await userService.updateProfile(req.user.id, req.body);

      res.json({
        success: true,
        message: 'Perfil atualizado com sucesso',
        data: user,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: 'Update Error',
        message: error.message,
      });
    }
  }

  /**
   * Get user orders
   */
  async getOrders(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: 'Unauthorized',
          message: 'Usuário não autenticado',
        });
      }

      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const result = await userService.getOrders(req.user.id, page, limit);

      res.json({
        success: true,
        data: result.orders,
        pagination: result.pagination,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: 'Error',
        message: error.message,
      });
    }
  }

  /**
   * Get user addresses
   */
  async getAddresses(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: 'Unauthorized',
          message: 'Usuário não autenticado',
        });
      }

      const addresses = await userService.getAddresses(req.user.id);

      res.json({
        success: true,
        data: addresses,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: 'Error',
        message: error.message,
      });
    }
  }

  /**
   * Create address
   */
  async createAddress(req: AuthRequest<{}, {}, CreateAddressInput>, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: 'Unauthorized',
          message: 'Usuário não autenticado',
        });
      }

      const address = await userService.createAddress(req.user.id, req.body);

      res.status(201).json({
        success: true,
        message: 'Endereço criado com sucesso',
        data: address,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: 'Create Error',
        message: error.message,
      });
    }
  }

  /**
   * Update address
   */
  async updateAddress(req: AuthRequest<{ id: string }, {}, UpdateAddressInput>, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: 'Unauthorized',
          message: 'Usuário não autenticado',
        });
      }

      const address = await userService.updateAddress(req.user.id, req.params.id, req.body);

      res.json({
        success: true,
        message: 'Endereço atualizado com sucesso',
        data: address,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: 'Update Error',
        message: error.message,
      });
    }
  }

  /**
   * Delete address
   */
  async deleteAddress(req: AuthRequest<{ id: string }>, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: 'Unauthorized',
          message: 'Usuário não autenticado',
        });
      }

      const result = await userService.deleteAddress(req.user.id, req.params.id);

      res.json({
        success: true,
        message: result.message,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: 'Delete Error',
        message: error.message,
      });
    }
  }
}

export const userController = new UserController();
