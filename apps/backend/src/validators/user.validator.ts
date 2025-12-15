import { z } from 'zod';

export const updateProfileSchema = z.object({
  name: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres').optional(),
  cpf: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        const cleaned = val.replace(/[^\d]/g, '');
        return cleaned.length === 11;
      },
      { message: 'CPF inválido' }
    ),
  phone: z.string().optional(),
});

export const createAddressSchema = z.object({
  name: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres'),
  street: z.string().min(3, 'O endereço deve ter no mínimo 3 caracteres'),
  number: z.string().min(1, 'O número é obrigatório'),
  complement: z.string().optional(),
  neighborhood: z.string().min(3, 'O bairro deve ter no mínimo 3 caracteres'),
  city: z.string().min(3, 'A cidade deve ter no mínimo 3 caracteres'),
  state: z.string().length(2, 'O estado deve ter 2 caracteres'),
  zipCode: z.string().regex(/^\d{5}-?\d{3}$/, 'CEP inválido'),
  isDefault: z.boolean().optional(),
});

export const updateAddressSchema = createAddressSchema.partial();

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type CreateAddressInput = z.infer<typeof createAddressSchema>;
export type UpdateAddressInput = z.infer<typeof updateAddressSchema>;
