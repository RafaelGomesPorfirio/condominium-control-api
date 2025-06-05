import { z } from 'zod';

export const createVisitanteSchema = z.object({
  nomeVisitante: z.string()
    .min(3, 'Nome deve ter pelo menos 3 caracteres')
    .max(100, 'Nome não pode exceder 100 caracteres'),
  documentoVisitante: z.string()
    .min(11, 'Documento deve ter pelo menos 11 caracteres')
    .max(20, 'Documento não pode exceder 20 caracteres'),
  telefoneVisitante: z.string()
    .max(20, 'Telefone não pode exceder 20 caracteres')
    .optional(),
});

export const updateVisitanteSchema = createVisitanteSchema.partial();