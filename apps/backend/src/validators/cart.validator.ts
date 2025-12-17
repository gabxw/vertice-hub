import { z } from 'zod';

export const addToCartSchema = z.object({
  variantId: z.string().min(1, 'ID de variante inválido'),
  quantity: z.number().int().positive('Quantidade deve ser positiva'),
});

export const updateCartItemSchema = z.object({
  quantity: z.number().int().min(0, 'Quantidade não pode ser negativa'),
});

export const createOrderSchema = z.object({
  items: z.array(z.object({
    productId: z.string().min(1, 'ID de produto inválido'),
    variantId: z.string().optional(), // Optional if size/color provided
    size: z.string().optional(), // For lookup by size + color
    color: z.string().optional(), // For lookup by size + color
    quantity: z.number().int().positive('Quantidade deve ser positiva'),
    price: z.number().positive('Preço deve ser positivo'),
  })),
  shippingAddress: z.object({
    name: z.string().min(1, 'Nome é obrigatório'),
    street: z.string().min(1, 'Rua é obrigatória'),
    number: z.string().min(1, 'Número é obrigatório'),
    complement: z.string().optional(),
    neighborhood: z.string().min(1, 'Bairro é obrigatório'),
    city: z.string().min(1, 'Cidade é obrigatória'),
    state: z.string().length(2, 'Estado deve ter 2 caracteres'),
    zipCode: z.string().min(8, 'CEP é obrigatório'),
  }),
  couponCode: z.string().optional(),
});

export type AddToCartInput = z.infer<typeof addToCartSchema>;
export type UpdateCartItemInput = z.infer<typeof updateCartItemSchema>;
export type CreateOrderInput = z.infer<typeof createOrderSchema>;
