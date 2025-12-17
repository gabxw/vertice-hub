import { client, checkoutNodeJssdk } from '../config/paypal';
import { env } from '../config/env';
import { logger } from '../config/logger';

export interface PayPalOrderItem {
  name: string;
  description?: string;
  quantity: string;
  unit_amount: {
    currency_code: string;
    value: string;
  };
}

export interface CreatePayPalOrderData {
  items: PayPalOrderItem[];
  total: number;
  currency?: string;
  orderId: string;
}

export class PayPalService {
  /**
   * Create a PayPal order
   */
  static async createOrder(data: CreatePayPalOrderData) {
    try {
      const request = new checkoutNodeJssdk.orders.OrdersCreateRequest();
      request.prefer('return=representation');
      request.requestBody({
        intent: 'CAPTURE',
        application_context: {
          brand_name: 'VÉRTICE',
          landing_page: 'NO_PREFERENCE',
          user_action: 'PAY_NOW',
          return_url: `${env.FRONTEND_URL}/pagamento/sucesso`,
          cancel_url: `${env.FRONTEND_URL}/pagamento/cancelado`,
        },
        purchase_units: [
          {
            reference_id: data.orderId,
            description: `Pedido #${data.orderId}`,
            amount: {
              currency_code: data.currency || 'BRL',
              value: data.total.toFixed(2),
              breakdown: {
                item_total: {
                  currency_code: data.currency || 'BRL',
                  value: data.total.toFixed(2),
                },
              },
            },
            items: data.items,
          },
        ],
      });

      const response = await client().execute(request);
      
      logger.info('PayPal order created', {
        paypalOrderId: response.result.id,
        orderId: data.orderId,
        status: response.result.status,
      });

      return {
        id: response.result.id,
        status: response.result.status,
        links: response.result.links,
      };
    } catch (error: any) {
      logger.error('Error creating PayPal order', {
        error: error.message,
        details: error.response?.data || error,
      });
      throw new Error('Erro ao criar pedido no PayPal');
    }
  }

  /**
   * Capture payment for an order
   */
  static async captureOrder(paypalOrderId: string) {
    try {
      const request = new checkoutNodeJssdk.orders.OrdersCaptureRequest(paypalOrderId);
      request.requestBody({});

      const response = await client().execute(request);

      logger.info('PayPal order captured', {
        paypalOrderId,
        status: response.result.status,
        captureId: response.result.purchase_units[0]?.payments?.captures?.[0]?.id,
      });

      return {
        id: response.result.id,
        status: response.result.status,
        payer: response.result.payer,
        purchase_units: response.result.purchase_units,
      };
    } catch (error: any) {
      logger.error('Error capturing PayPal order', {
        paypalOrderId,
        error: error.message,
        details: error.response?.data || error,
      });
      throw new Error('Erro ao capturar pagamento no PayPal');
    }
  }

  /**
   * Get order details
   */
  static async getOrder(paypalOrderId: string) {
    try {
      const request = new checkoutNodeJssdk.orders.OrdersGetRequest(paypalOrderId);
      const response = await client().execute(request);

      return {
        id: response.result.id,
        status: response.result.status,
        payer: response.result.payer,
        purchase_units: response.result.purchase_units,
      };
    } catch (error: any) {
      logger.error('Error getting PayPal order', {
        paypalOrderId,
        error: error.message,
      });
      throw new Error('Erro ao buscar pedido no PayPal');
    }
  }

  /**
   * Refund a capture
   */
  static async refundCapture(captureId: string, amount?: number, currency: string = 'BRL') {
    try {
      const request = new checkoutNodeJssdk.payments.CapturesRefundRequest(captureId);
      
      if (amount) {
        request.requestBody({
          amount: {
            value: amount.toFixed(2),
            currency_code: currency,
          },
        });
      } else {
        request.requestBody({});
      }

      const response = await client().execute(request);

      logger.info('PayPal capture refunded', {
        captureId,
        refundId: response.result.id,
        status: response.result.status,
      });

      return {
        id: response.result.id,
        status: response.result.status,
        amount: response.result.amount,
      };
    } catch (error: any) {
      logger.error('Error refunding PayPal capture', {
        captureId,
        error: error.message,
      });
      throw new Error('Erro ao reembolsar pagamento no PayPal');
    }
  }
}
