import { Request, Response } from 'express';
import { PayPalService } from '../services/paypal.service';
import { prisma } from '../config/database';
import { logger } from '../config/logger';

// Extend Request type to include user
interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export class PayPalController {
  /**
   * Create PayPal order
   * POST /api/v1/payments/paypal/create-order
   */
  static async createOrder(req: AuthenticatedRequest, res: Response) {
    try {
      const { orderId } = req.body;

      if (!orderId) {
        return res.status(400).json({
          success: false,
          message: 'ID do pedido é obrigatório',
        });
      }

      // Get order from database
      const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: {
          items: {
            include: {
              variant: {
                include: {
                  product: true,
                },
              },
            },
          },
        },
      });

      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Pedido não encontrado',
        });
      }

      if (order.userId !== req.user?.id) {
        return res.status(403).json({
          success: false,
          message: 'Você não tem permissão para acessar este pedido',
        });
      }

      // Prepare items for PayPal
      const items = order.items.map((item) => ({
        name: item.variant.product.name,
        description: item.variant.product.description?.substring(0, 127),
        quantity: item.quantity.toString(),
        unit_amount: {
          currency_code: 'BRL',
          value: item.price.toFixed(2),
        },
      }));

      // Create PayPal order
      const paypalOrder = await PayPalService.createOrder({
        items,
        total: Number(order.total),
        currency: 'BRL',
        orderId: order.orderNumber,
      });

      // Create or update payment with PayPal order ID
      await prisma.payment.upsert({
        where: { orderId: orderId },
        create: {
          orderId: orderId,
          provider: 'paypal',
          transactionId: paypalOrder.id,
          status: 'PENDING',
          amount: order.total,
          paymentMethod: 'paypal',
        },
        update: {
          transactionId: paypalOrder.id,
        },
      });

      // Find approval URL
      const approvalUrl = paypalOrder.links?.find((link: { rel: string; href: string }) => link.rel === 'approve')?.href;

      return res.json({
        success: true,
        data: {
          id: paypalOrder.id,
          status: paypalOrder.status,
          approvalUrl,
        },
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      logger.error('Error in createOrder controller', { error: errorMessage });
      return res.status(500).json({
        success: false,
        message: errorMessage || 'Erro ao criar pedido no PayPal',
      });
    }
  }

  /**
   * Capture PayPal order
   * POST /api/v1/payments/paypal/capture-order
   */
  static async captureOrder(req: Request, res: Response) {
    try {
      const { paypalOrderId } = req.body;

      if (!paypalOrderId) {
        return res.status(400).json({
          success: false,
          message: 'ID do pedido PayPal é obrigatório',
        });
      }

      // Capture the order
      const capturedOrder = await PayPalService.captureOrder(paypalOrderId);

      // Find our order by PayPal order ID (using transactionId instead of externalId)
      const payment = await prisma.payment.findFirst({
        where: { transactionId: paypalOrderId },
        include: { order: true },
      });

      if (!payment) {
        return res.status(404).json({
          success: false,
          message: 'Pagamento não encontrado',
        });
      }

      // Update payment and order status (using APPROVED instead of COMPLETED, CONFIRMED instead of PAID)
      await prisma.$transaction([
        prisma.payment.update({
          where: { id: payment.id },
          data: {
            status: 'APPROVED',
          },
        }),
        prisma.order.update({
          where: { id: payment.orderId },
          data: {
            status: 'CONFIRMED',
            paymentStatus: 'APPROVED',
          },
        }),
        prisma.orderStatusHistory.create({
          data: {
            orderId: payment.orderId,
            status: 'CONFIRMED',
            notes: 'Pagamento confirmado via PayPal',
          },
        }),
      ]);

      return res.json({
        success: true,
        data: {
          id: capturedOrder.id,
          status: capturedOrder.status,
          orderId: payment.order.orderNumber,
        },
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      logger.error('Error in captureOrder controller', { error: errorMessage });
      return res.status(500).json({
        success: false,
        message: errorMessage || 'Erro ao capturar pagamento no PayPal',
      });
    }
  }

  /**
   * Get PayPal order status
   * GET /api/v1/payments/paypal/order/:paypalOrderId
   */
  static async getOrderStatus(req: Request, res: Response) {
    try {
      const { paypalOrderId } = req.params;

      const order = await PayPalService.getOrder(paypalOrderId);

      return res.json({
        success: true,
        data: order,
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      logger.error('Error in getOrderStatus controller', { error: errorMessage });
      return res.status(500).json({
        success: false,
        message: errorMessage || 'Erro ao buscar status do pedido',
      });
    }
  }

  /**
   * PayPal webhook handler
   * POST /api/v1/payments/paypal/webhook
   */
  static async handleWebhook(req: Request, res: Response) {
    try {
      const event = req.body;

      logger.info('PayPal webhook received', {
        eventType: event.event_type,
        resourceId: event.resource?.id,
      });

      // Handle different event types
      switch (event.event_type) {
        case 'PAYMENT.CAPTURE.COMPLETED':
          await PayPalController.handlePaymentCaptured(event);
          break;
        case 'PAYMENT.CAPTURE.DENIED':
          await PayPalController.handlePaymentDenied(event);
          break;
        case 'PAYMENT.CAPTURE.REFUNDED':
          await PayPalController.handlePaymentRefunded(event);
          break;
        default:
          logger.info('Unhandled PayPal webhook event', { eventType: event.event_type });
      }

      return res.status(200).json({ received: true });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      logger.error('Error in handleWebhook controller', { error: errorMessage });
      return res.status(500).json({
        success: false,
        message: 'Erro ao processar webhook',
      });
    }
  }

  private static async handlePaymentCaptured(event: { resource: { id: string; custom_id?: string; supplementary_data?: { related_ids?: { order_id?: string } } } }) {
    const captureId = event.resource.id;
    const customId = event.resource.custom_id;

    logger.info('Payment captured', { captureId, customId });

    // Update payment status in database (using transactionId instead of externalId)
    const payment = await prisma.payment.findFirst({
      where: { transactionId: event.resource.supplementary_data?.related_ids?.order_id },
    });

    if (payment) {
      await prisma.$transaction([
        prisma.payment.update({
          where: { id: payment.id },
          data: {
            status: 'APPROVED',
          },
        }),
        prisma.order.update({
          where: { id: payment.orderId },
          data: { 
            status: 'CONFIRMED',
            paymentStatus: 'APPROVED',
          },
        }),
      ]);
    }
  }

  private static async handlePaymentDenied(event: { resource: { id: string; supplementary_data?: { related_ids?: { order_id?: string } } } }) {
    const captureId = event.resource.id;
    logger.info('Payment denied', { captureId });

    const payment = await prisma.payment.findFirst({
      where: { transactionId: event.resource.supplementary_data?.related_ids?.order_id },
    });

    if (payment) {
      await prisma.$transaction([
        prisma.payment.update({
          where: { id: payment.id },
          data: { status: 'REJECTED' },
        }),
        prisma.order.update({
          where: { id: payment.orderId },
          data: { 
            status: 'CANCELLED',
            paymentStatus: 'REJECTED',
          },
        }),
      ]);
    }
  }

  private static async handlePaymentRefunded(event: { resource: { id: string; supplementary_data?: { related_ids?: { order_id?: string } } } }) {
    const refundId = event.resource.id;
    logger.info('Payment refunded', { refundId });

    const payment = await prisma.payment.findFirst({
      where: { transactionId: event.resource.supplementary_data?.related_ids?.order_id },
    });

    if (payment) {
      await prisma.$transaction([
        prisma.payment.update({
          where: { id: payment.id },
          data: { status: 'REFUNDED' },
        }),
        prisma.order.update({
          where: { id: payment.orderId },
          data: { 
            status: 'REFUNDED',
            paymentStatus: 'REFUNDED',
          },
        }),
      ]);
    }
  }
}
