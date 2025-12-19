import { client, checkoutNodeJssdk } from '../config/paypal';
import { env } from '../config/env';
import { logger } from '../config/logger';

// Define types for PayPal responses
interface PayPalOrderResponse {
  id: string;
  status: string;
  links?: Array<{ href: string; rel: string; method?: string }>;
  payer?: {
    email_address?: string;
    payer_id?: string;
    name?: { given_name?: string; surname?: string };
  };
  purchase_units?: Array<{
    reference_id?: string;
    payments?: {
      captures?: Array<{ id: string; status: string; amount?: { currency_code: string; value: string } }>;
    };
  }>;
  amount?: { currency_code: string; value: string };
}

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

      const response = await client().execute<PayPalOrderResponse>(request);
      const result = response.result;
      
      logger.info('PayPal order created', {
        paypalOrderId: result.id,
        orderId: data.orderId,
        status: result.status,
      });

      return {
        id: result.id,
        status: result.status,
        links: result.links,
      };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      logger.error('Error creating PayPal order', {
        error: errorMessage,
        details: error,
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

      const response = await client().execute<PayPalOrderResponse>(request);
      const result = response.result;

      logger.info('PayPal order captured', {
        paypalOrderId,
        status: result.status,
        captureId: result.purchase_units?.[0]?.payments?.captures?.[0]?.id,
      });

      return {
        id: result.id,
        status: result.status,
        payer: result.payer,
        purchase_units: result.purchase_units,
      };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      logger.error('Error capturing PayPal order', {
        paypalOrderId,
        error: errorMessage,
        details: error,
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
      const response = await client().execute<PayPalOrderResponse>(request);
      const result = response.result;

      return {
        id: result.id,
        status: result.status,
        payer: result.payer,
        purchase_units: result.purchase_units,
      };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      logger.error('Error getting PayPal order', {
        paypalOrderId,
        error: errorMessage,
      });
      throw new Error('Erro ao buscar pedido no PayPal');
    }
  }

  /**
   * Refund a capture
   * Note: This method is currently disabled as the PayPal SDK types don't include payments namespace
   */
  static async refundCapture(captureId: string, _amount?: number, _currency: string = 'BRL') {
    // TODO: Implement refund using PayPal REST API directly
    logger.warn('Refund not implemented', { captureId });
    throw new Error('Reembolso via PayPal não está implementado ainda');
  }
}
