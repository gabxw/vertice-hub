import { Request, Response } from 'express';
import { categoryService } from '../services/category.service';
import type { CreateCategoryInput, UpdateCategoryInput } from '../validators/category.validator';

export class CategoryController {
  /**
   * Get all categories
   */
  async getCategories(req: Request, res: Response) {
    try {
      const categories = await categoryService.getCategories();

      res.json({
        success: true,
        data: categories,
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
   * Get category by slug
   */
  async getCategoryBySlug(req: Request<{ slug: string }>, res: Response) {
    try {
      const category = await categoryService.getCategoryBySlug(req.params.slug);

      res.json({
        success: true,
        data: category,
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
   * Get category products
   */
  async getCategoryProducts(req: Request<{ slug: string }>, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 12;

      const result = await categoryService.getCategoryProducts(req.params.slug, page, limit);

      res.json({
        success: true,
        data: {
          category: result.category,
          products: result.products,
        },
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
   * Create category (admin only)
   */
  async createCategory(req: Request<{}, {}, CreateCategoryInput>, res: Response) {
    try {
      const category = await categoryService.createCategory(req.body);

      res.status(201).json({
        success: true,
        message: 'Categoria criada com sucesso',
        data: category,
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
   * Update category (admin only)
   */
  async updateCategory(req: Request<{ id: string }, {}, UpdateCategoryInput>, res: Response) {
    try {
      const category = await categoryService.updateCategory(req.params.id, req.body);

      res.json({
        success: true,
        message: 'Categoria atualizada com sucesso',
        data: category,
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
   * Delete category (admin only)
   */
  async deleteCategory(req: Request<{ id: string }>, res: Response) {
    try {
      const result = await categoryService.deleteCategory(req.params.id);

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

export const categoryController = new CategoryController();
