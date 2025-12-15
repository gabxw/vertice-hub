import { Router } from 'express';
import { userController } from '@/controllers/user.controller';
import { validate } from '@/middlewares/validate.middleware';
import { authenticate } from '@/middlewares/auth.middleware';
import { updateProfileSchema, createAddressSchema, updateAddressSchema } from '@/validators/user.validator';

const router = Router();

// All routes require authentication
router.use(authenticate);

/**
 * @route   GET /api/v1/users/me
 * @desc    Get user profile
 * @access  Private
 */
router.get('/me', userController.getProfile.bind(userController));

/**
 * @route   PUT /api/v1/users/me
 * @desc    Update user profile
 * @access  Private
 */
router.put('/me', validate(updateProfileSchema), userController.updateProfile.bind(userController));

/**
 * @route   GET /api/v1/users/me/orders
 * @desc    Get user orders
 * @access  Private
 */
router.get('/me/orders', userController.getOrders.bind(userController));

/**
 * @route   GET /api/v1/users/me/addresses
 * @desc    Get user addresses
 * @access  Private
 */
router.get('/me/addresses', userController.getAddresses.bind(userController));

/**
 * @route   POST /api/v1/users/me/addresses
 * @desc    Create address
 * @access  Private
 */
router.post('/me/addresses', validate(createAddressSchema), userController.createAddress.bind(userController));

/**
 * @route   PUT /api/v1/users/me/addresses/:id
 * @desc    Update address
 * @access  Private
 */
router.put('/me/addresses/:id', validate(updateAddressSchema), userController.updateAddress.bind(userController));

/**
 * @route   DELETE /api/v1/users/me/addresses/:id
 * @desc    Delete address
 * @access  Private
 */
router.delete('/me/addresses/:id', userController.deleteAddress.bind(userController));

export default router;
