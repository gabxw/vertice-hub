import { Response } from 'express';
import { cartService } from '../services/cart.service';
import { orderService } from '../services/order.service';
import { AuthRequest } from '../types';
import type { AddToCartInput, UpdateCartItemInput, CreateOrderInput } from '../validators/cart.validator';

export class CartController {
  /**
   * Get cart
   */
  async getCart(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: 'Unauthorized',
          message: 'Usuário não autenticado',
        });
      }

      const result = await cartService.getCartSummary(req.user.id);

      res.json({
        success: true,
        data: result,
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
   * Add item to cart
   */
  async addItem(req: AuthRequest<{}, {}, AddToCartInput>, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: 'Unauthorized',
          message: 'Usuário não autenticado',
        });
      }

      const cart = await cartService.addItem(req.user.id, req.body);

      res.json({
        success: true,
        message: 'Item adicionado ao carrinho',
        data: cart,
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
   * Update cart item
   */
  async updateItem(req: AuthRequest<{ id: string }, {}, UpdateCartItemInput>, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: 'Unauthorized',
          message: 'Usuário não autenticado',
        });
      }

      const cart = await cartService.updateItem(req.user.id, req.params.id, req.body);

      res.json({
        success: true,
        message: 'Item atualizado',
        data: cart,
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
   * Remove item from cart
   */
  async removeItem(req: AuthRequest<{ id: string }>, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: 'Unauthorized',
          message: 'Usuário não autenticado',
        });
      }

      const cart = await cartService.removeItem(req.user.id, req.params.id);

      res.json({
        success: true,
        message: 'Item removido',
        data: cart,
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
   * Clear cart
   */
  async clearCart(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: 'Unauthorized',
          message: 'Usuário não autenticado',
        });
      }

      const cart = await cartService.clearCart(req.user.id);

      res.json({
        success: true,
        message: 'Carrinho limpo',
        data: cart,
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
   * Create order from cart
   */
  async createOrder(req: AuthRequest<{}, {}, CreateOrderInput>, res: Response) {
    try {
      console.log('[CREATE ORDER] Controller called');
      console.log('[CREATE ORDER] User:', req.user);
      console.log('[CREATE ORDER] Body:', JSON.stringify(req.body, null, 2));
      
      // req.user is guaranteed to exist because of authenticate middleware
      const order = await orderService.createOrder(req.user!.id, req.body);

      res.status(201).json({
        success: true,
        message: 'Pedido criado com sucesso',
        data: order,
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
   * Get order by ID
   */
  async getOrder(req: AuthRequest<{ id: string }>, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: 'Unauthorized',
          message: 'Usuário não autenticado',
        });
      }

      const order = await orderService.getOrder(req.params.id, req.user.id);

      res.json({
        success: true,
        data: order,
      });
    } catch (error: any) {
      res.status(404).json({
        success: false,
        error: 'Not Found',
        message: error.message,
      });
    }
  }

  /**
   * Get order tracking
   */
  async getOrderTracking(req: AuthRequest<{ id: string }>, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: 'Unauthorized',
          message: 'Usuário não autenticado',
        });
      }

      const order = await orderService.getOrder(req.params.id, req.user.id);

      res.json({
        success: true,
        data: {
          orderNumber: order.orderNumber,
          status: order.status,
          trackingCode: order.trackingCode,
          statusHistory: order.statusHistory,
        },
      });
    } catch (error: any) {
      res.status(404).json({
        success: false,
        error: 'Not Found',
        message: error.message,
      });
    }
  }
}

export const cartController = new CartController();
