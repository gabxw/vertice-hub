import { Router } from 'express';
import { cartController } from '../controllers/cart.controller';
import { validate } from '../middlewares/validate.middleware';
import { authenticate } from '../middlewares/auth.middleware';
import { addToCartSchema, updateCartItemSchema } from '../validators/cart.validator';

const router = Router();

// All routes require authentication
router.use(authenticate);

/**
 * @route   GET /api/v1/cart
 * @desc    Get cart
 * @access  Private
 */
router.get('/', cartController.getCart.bind(cartController));

/**
 * @route   POST /api/v1/cart/items
 * @desc    Add item to cart
 * @access  Private
 */
router.post('/items', validate(addToCartSchema), cartController.addItem.bind(cartController));

/**
 * @route   PUT /api/v1/cart/items/:id
 * @desc    Update cart item
 * @access  Private
 */
router.put('/items/:id', validate(updateCartItemSchema), cartController.updateItem.bind(cartController));

/**
 * @route   DELETE /api/v1/cart/items/:id
 * @desc    Remove item from cart
 * @access  Private
 */
router.delete('/items/:id', cartController.removeItem.bind(cartController));

/**
 * @route   DELETE /api/v1/cart
 * @desc    Clear cart
 * @access  Private
 */
router.delete('/', cartController.clearCart.bind(cartController));

export default router;
