import { Router } from 'express';
import { cartController } from '@/controllers/cart.controller';
import { validate } from '@/middlewares/validate.middleware';
import { authenticate } from '@/middlewares/auth.middleware';
import { createOrderSchema } from '@/validators/cart.validator';

const router = Router();

// All routes require authentication
router.use(authenticate);

/**
 * @route   POST /api/v1/orders
 * @desc    Create order from cart
 * @access  Private
 */
router.post('/', validate(createOrderSchema), cartController.createOrder.bind(cartController));

/**
 * @route   GET /api/v1/orders/:id
 * @desc    Get order by ID
 * @access  Private
 */
router.get('/:id', cartController.getOrder.bind(cartController));

/**
 * @route   GET /api/v1/orders/:id/tracking
 * @desc    Get order tracking
 * @access  Private
 */
router.get('/:id/tracking', cartController.getOrderTracking.bind(cartController));

export default router;
