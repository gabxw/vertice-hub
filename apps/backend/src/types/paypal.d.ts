declare module '@paypal/checkout-server-sdk' {
  export namespace core {
    class PayPalHttpClient {
      constructor(environment: SandboxEnvironment | LiveEnvironment);
      execute<T = PayPalOrderResult>(request: unknown): Promise<{ result: T; statusCode: number }>;
    }

    class SandboxEnvironment {
      constructor(clientId: string, clientSecret: string);
    }

    class LiveEnvironment {
      constructor(clientId: string, clientSecret: string);
    }
  }

  export namespace orders {
    class OrdersCreateRequest {
      prefer(prefer: string): void;
      requestBody(body: unknown): void;
    }

    class OrdersCaptureRequest {
      constructor(orderId: string);
      requestBody(body: unknown): void;
    }

    class OrdersGetRequest {
      constructor(orderId: string);
    }
  }

  export namespace payments {
    class CapturesRefundRequest {
      constructor(captureId: string);
      requestBody(body: unknown): void;
    }
  }

  // PayPal Order Result types
  export interface PayPalOrderResult {
    id: string;
    status: string;
    links?: PayPalLink[];
    payer?: PayPalPayer;
    purchase_units?: PayPalPurchaseUnit[];
    amount?: PayPalAmount;
  }

  export interface PayPalLink {
    href: string;
    rel: string;
    method?: string;
  }

  export interface PayPalPayer {
    email_address?: string;
    payer_id?: string;
    name?: {
      given_name?: string;
      surname?: string;
    };
  }

  export interface PayPalPurchaseUnit {
    reference_id?: string;
    payments?: {
      captures?: PayPalCapture[];
    };
  }

  export interface PayPalCapture {
    id: string;
    status: string;
    amount?: PayPalAmount;
  }

  export interface PayPalAmount {
    currency_code: string;
    value: string;
  }
}
