import { Router } from 'express';
import { categoryController } from '@/controllers/category.controller';
import { validate } from '@/middlewares/validate.middleware';
import { authenticate, authorize } from '@/middlewares/auth.middleware';
import { createCategorySchema, updateCategorySchema } from '@/validators/category.validator';

const router = Router();

/**
 * @route   GET /api/v1/categories
 * @desc    Get all categories
 * @access  Public
 */
router.get('/', categoryController.getCategories.bind(categoryController));

/**
 * @route   GET /api/v1/categories/:slug
 * @desc    Get category by slug
 * @access  Public
 */
router.get('/:slug', categoryController.getCategoryBySlug.bind(categoryController));

/**
 * @route   GET /api/v1/categories/:slug/products
 * @desc    Get category products
 * @access  Public
 */
router.get('/:slug/products', categoryController.getCategoryProducts.bind(categoryController));

/**
 * @route   POST /api/v1/categories
 * @desc    Create category
 * @access  Private (Admin only)
 */
router.post('/', authenticate, authorize('ADMIN'), validate(createCategorySchema), categoryController.createCategory.bind(categoryController));

/**
 * @route   PUT /api/v1/categories/:id
 * @desc    Update category
 * @access  Private (Admin only)
 */
router.put('/:id', authenticate, authorize('ADMIN'), validate(updateCategorySchema), categoryController.updateCategory.bind(categoryController));

/**
 * @route   DELETE /api/v1/categories/:id
 * @desc    Delete category
 * @access  Private (Admin only)
 */
router.delete('/:id', authenticate, authorize('ADMIN'), categoryController.deleteCategory.bind(categoryController));

export default router;
