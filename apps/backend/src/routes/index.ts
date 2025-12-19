import { Router } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import productRoutes from './product.routes';
import categoryRoutes from './category.routes';
import cartRoutes from './cart.routes';
import orderRoutes from './order.routes';
import paypalRoutes from './paypal.routes';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

// Test endpoint to validate authentication
router.get('/test-auth', authenticate, (req: any, res) => {
  res.json({
    success: true,
    message: 'Authentication working!',
    user: req.user,
  });
});

// Mount routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);
router.use('/cart', cartRoutes);
router.use('/orders', orderRoutes);
router.use('/payments/paypal', paypalRoutes);

export default router;
