import { z } from 'zod';

export const createVisitanteSchema = z.object({
  nome: z.string().min(3, 'Nome deve ter ao menos 3 caracteres'),
  documento: z.string().min(11, 'Documento deve ter ao menos 11 caracteres'),
  telefone: z.string().optional(),
});
