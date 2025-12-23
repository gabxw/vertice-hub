import { Request, Response } from 'express';
import { productService } from '../services/product.service';
import { AuthRequest } from '../types';
import type { CreateProductInput, UpdateProductInput, ProductQueryInput, CreateReviewInput } from '../validators/product.validator';

export class ProductController {
  /**
   * Get all products
   */
  async getProducts(req: Request<{}, {}, {}, ProductQueryInput>, res: Response) {
    try {
      const result = await productService.getProducts(req.query);

      res.json({
        success: true,
        data: result.data,
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
   * Get product by slug
   */
  async getProductBySlug(req: Request<{ slug: string }>, res: Response) {
    try {
      const product = await productService.getProductBySlug(req.params.slug);

      res.json({
        success: true,
        data: product,
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
   * Get product by ID (for admin)
   */
  async getProductById(req: Request<{ id: string }>, res: Response) {
    try {
      const product = await productService.getProductById(req.params.id);

      res.json({
        success: true,
        data: product,
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
   * Get featured products
   */
  async getFeaturedProducts(req: Request, res: Response) {
    try {
      const limit = parseInt(req.query.limit as string) || 8;
      const products = await productService.getFeaturedProducts(limit);

      res.json({
        success: true,
        data: products,
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
   * Get new products
   */
  async getNewProducts(req: Request, res: Response) {
    try {
      const limit = parseInt(req.query.limit as string) || 8;
      const products = await productService.getNewProducts(limit);

      res.json({
        success: true,
        data: products,
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
   * Create product (admin only)
   */
  async createProduct(req: Request<{}, {}, CreateProductInput>, res: Response) {
    try {
      const product = await productService.createProduct(req.body);

      res.status(201).json({
        success: true,
        message: 'Produto criado com sucesso',
        data: product,
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
   * Update product (admin only)
   */
  async updateProduct(req: Request<{ id: string }, {}, UpdateProductInput>, res: Response) {
    try {
      const product = await productService.updateProduct(req.params.id, req.body);

      res.json({
        success: true,
        message: 'Produto atualizado com sucesso',
        data: product,
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
   * Delete product (admin only)
   */
  async deleteProduct(req: Request<{ id: string }>, res: Response) {
    try {
      const result = await productService.deleteProduct(req.params.id);

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

  /**
   * Get product reviews
   */
  async getProductReviews(req: Request<{ id: string }>, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const result = await productService.getProductReviews(req.params.id, page, limit);

      res.json({
        success: true,
        data: result.data,
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
   * Create product review
   */
  async createReview(req: AuthRequest<{ id: string }, {}, CreateReviewInput>, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: 'Unauthorized',
          message: 'Usuário não autenticado',
        });
      }

      const review = await productService.createReview(req.params.id, req.user.id, req.body);

      res.status(201).json({
        success: true,
        message: 'Avaliação criada com sucesso. Aguardando aprovação.',
        data: review,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: 'Create Error',
        message: error.message,
      });
    }
  }
}

export const productController = new ProductController();
