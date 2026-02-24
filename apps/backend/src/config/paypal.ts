import checkoutNodeJssdk from '@paypal/checkout-server-sdk';
import { env } from './env';

// Configure PayPal environment
function environment() {
  const clientId = env.PAYPAL_CLIENT_ID || '';
  const clientSecret = env.PAYPAL_CLIENT_SECRET || '';

  if (env.PAYPAL_MODE === 'production') {
    return new checkoutNodeJssdk.core.LiveEnvironment(clientId, clientSecret);
  }
  return new checkoutNodeJssdk.core.SandboxEnvironment(clientId, clientSecret);
}

// Create PayPal client
function client() {
  return new checkoutNodeJssdk.core.PayPalHttpClient(environment());
}

export { client, checkoutNodeJssdk };
