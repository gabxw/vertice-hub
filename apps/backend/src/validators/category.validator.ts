import { z } from 'zod';

export const createCategorySchema = z.object({
  name: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres'),
  slug: z.string().min(3, 'O slug deve ter no mínimo 3 caracteres').optional(),
  description: z.string().optional(),
  image: z.string().url('URL de imagem inválida').optional(),
  parentId: z.string().uuid('ID de categoria pai inválido').optional(),
  isActive: z.boolean().optional(),
});

export const updateCategorySchema = createCategorySchema.partial();

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
