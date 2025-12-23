import { Router } from 'express';
import { productController } from '../controllers/product.controller';
import { validate, validateQuery } from '../middlewares/validate.middleware';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import {
  createProductSchema,
  updateProductSchema,
  productQuerySchema,
  createReviewSchema,
} from '../validators/product.validator';

const router = Router();

/**
 * @route   GET /api/v1/products
 * @desc    Get all products with filters
 * @access  Public
 */
router.get('/', validateQuery(productQuerySchema), productController.getProducts.bind(productController));

/**
 * @route   GET /api/v1/products/featured
 * @desc    Get featured products
 * @access  Public
 */
router.get('/featured', productController.getFeaturedProducts.bind(productController));

/**
 * @route   GET /api/v1/products/new
 * @desc    Get new products
 * @access  Public
 */
router.get('/new', productController.getNewProducts.bind(productController));

/**
 * @route   GET /api/v1/products/by-id/:id
 * @desc    Get product by ID (for admin)
 * @access  Public
 */
router.get('/by-id/:id', productController.getProductById.bind(productController));

/**
 * @route   GET /api/v1/products/:slug
 * @desc    Get product by slug
 * @access  Public
 */
router.get('/:slug', productController.getProductBySlug.bind(productController));

/**
 * @route   GET /api/v1/products/:id/reviews
 * @desc    Get product reviews
 * @access  Public
 */
router.get('/:id/reviews', productController.getProductReviews.bind(productController));

/**
 * @route   POST /api/v1/products/:id/reviews
 * @desc    Create product review
 * @access  Private
 */
router.post('/:id/reviews', authenticate, validate(createReviewSchema), productController.createReview.bind(productController));

/**
 * @route   POST /api/v1/products
 * @desc    Create product
 * @access  Private (Admin only)
 */
router.post('/', authenticate, authorize('ADMIN'), validate(createProductSchema), productController.createProduct.bind(productController));

/**
 * @route   PUT /api/v1/products/:id
 * @desc    Update product
 * @access  Private (Admin only)
 */
router.put('/:id', authenticate, authorize('ADMIN'), validate(updateProductSchema), productController.updateProduct.bind(productController));

/**
 * @route   DELETE /api/v1/products/:id
 * @desc    Delete product
 * @access  Private (Admin only)
 */
router.delete('/:id', authenticate, authorize('ADMIN'), productController.deleteProduct.bind(productController));

export default router;
