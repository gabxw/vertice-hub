import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres'),
  slug: z.string().min(3, 'O slug deve ter no mínimo 3 caracteres').optional(),
  description: z.string().min(10, 'A descrição deve ter no mínimo 10 caracteres'),
  story: z.string().min(10, 'A história deve ter no mínimo 10 caracteres'),
  price: z.number().positive('O preço deve ser positivo'),
  originalPrice: z.number().positive().optional(),
  categoryId: z.string().uuid('ID de categoria inválido'),
  supplierId: z.string().uuid('ID de fornecedor inválido').optional(),
  isNew: z.boolean().optional(),
  isBestSeller: z.boolean().optional(),
  isActive: z.boolean().optional(),
  images: z.array(
    z.object({
      url: z.string().url('URL de imagem inválida'),
      alt: z.string().optional(),
      order: z.number().optional(),
    })
  ),
  variants: z.array(
    z.object({
      size: z.string().min(1, 'Tamanho é obrigatório'),
      colorName: z.string().min(1, 'Nome da cor é obrigatório'),
      colorHex: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Código hexadecimal inválido'),
      sku: z.string().min(1, 'SKU é obrigatório'),
      stock: z.number().int().min(0, 'Estoque não pode ser negativo'),
    })
  ),
  benefits: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
});

export const updateProductSchema = createProductSchema.partial();

export const productQuerySchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  categoryId: z.string().uuid().optional(),
  minPrice: z.string().optional(),
  maxPrice: z.string().optional(),
  isNew: z.string().optional(),
  isBestSeller: z.string().optional(),
  search: z.string().optional(),
  tags: z.string().optional(),
});

export const createReviewSchema = z.object({
  rating: z.number().int().min(1).max(5, 'A avaliação deve ser entre 1 e 5'),
  content: z.string().min(10, 'O comentário deve ter no mínimo 10 caracteres'),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
export type ProductQueryInput = z.infer<typeof productQuerySchema>;
export type CreateReviewInput = z.infer<typeof createReviewSchema>;
