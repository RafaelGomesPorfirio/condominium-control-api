import { z } from 'zod';

export const createUnidadeSchema = z.object({
  numeroUnidade: z.string()
    .min(1, 'Número da unidade é obrigatório')
    .max(10, 'Número não pode exceder 10 caracteres'),
  blocoUnidade: z.string()
    .max(10, 'Bloco não pode exceder 10 caracteres')
    .optional(),
  andarUnidade: z.number()
    .int('Andar deve ser um número inteiro')
    .nonnegative('Andar não pode ser negativo')
    .optional(),
  tipoUnidade: z.string()
    .max(20, 'Tipo não pode exceder 20 caracteres')
    .optional(),
  condominioId: z.number()
    .int('ID do condomínio deve ser inteiro')
    .positive('ID do condomínio deve ser positivo'),
});

export const updateUnidadeSchema = createUnidadeSchema.partial();