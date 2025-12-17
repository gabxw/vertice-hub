import { Router } from 'express';
import { PayPalController } from '../controllers/paypal.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

// Create PayPal order (requires authentication)
router.post('/create-order', authenticate, PayPalController.createOrder);

// Capture PayPal order (requires authentication)
router.post('/capture-order', authenticate, PayPalController.captureOrder);

// Get PayPal order status (requires authentication)
router.get('/order/:paypalOrderId', authenticate, PayPalController.getOrderStatus);

// PayPal webhook (no authentication required)
router.post('/webhook', PayPalController.handleWebhook);

export default router;
