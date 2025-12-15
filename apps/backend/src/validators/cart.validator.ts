import { z } from 'zod';

export const addToCartSchema = z.object({
  variantId: z.string().uuid('ID de variante inválido'),
  quantity: z.number().int().positive('Quantidade deve ser positiva'),
});

export const updateCartItemSchema = z.object({
  quantity: z.number().int().min(0, 'Quantidade não pode ser negativa'),
});

export const createOrderSchema = z.object({
  shippingAddressId: z.string().uuid('ID de endereço inválido'),
  paymentMethod: z.enum(['credit_card', 'pix', 'boleto']),
  couponCode: z.string().optional(),
});

export type AddToCartInput = z.infer<typeof addToCartSchema>;
export type UpdateCartItemInput = z.infer<typeof updateCartItemSchema>;
export type CreateOrderInput = z.infer<typeof createOrderSchema>;
