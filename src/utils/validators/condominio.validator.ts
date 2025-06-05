import { z } from 'zod';

export const createCondominioSchema = z.object({
  nomeCondominio: z.string()
    .min(3, 'Nome deve ter pelo menos 3 caracteres')
    .max(100, 'Nome não pode exceder 100 caracteres'),
  enderecoCondominio: z.string()
    .min(5, 'Endereço deve ter pelo menos 5 caracteres')
    .max(200, 'Endereço não pode exceder 200 caracteres'),
});

export const updateCondominioSchema = createCondominioSchema.partial();