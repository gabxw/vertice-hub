import api from '@/lib/api';

export interface CreatePayPalOrderResponse {
  success: boolean;
  data: {
    id: string;
    status: string;
    approvalUrl: string;
  };
}

export interface CapturePayPalOrderResponse {
  success: boolean;
  data: {
    id: string;
    status: string;
    orderId: string;
  };
}

/**
 * Create a PayPal order
 */
export const createPayPalOrder = async (orderId: string): Promise<CreatePayPalOrderResponse> => {
  const response = await api.post('/payments/paypal/create-order', { orderId });
  return response.data;
};

/**
 * Capture a PayPal order after user approval
 */
export const capturePayPalOrder = async (paypalOrderId: string): Promise<CapturePayPalOrderResponse> => {
  const response = await api.post('/payments/paypal/capture-order', { paypalOrderId });
  return response.data;
};

/**
 * Get PayPal order status
 */
export const getPayPalOrderStatus = async (paypalOrderId: string) => {
  const response = await api.get(`/payments/paypal/order/${paypalOrderId}`);
  return response.data;
};
