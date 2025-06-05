import { z } from 'zod';

export const createMovimentacaoSchema = z.object({
  visitanteId: z.number().int().positive('ID do visitante inválido'),
  unidadeId: z.number().int().positive('ID da unidade inválido'),
  entrada: z.coerce.date().optional()
});

export const updateMovimentacaoSchema = z.object({
  saida: z.coerce.date().optional(),
  unidadeId: z.number().int().positive('ID da unidade inválido').optional()
});

export const filterMovimentacaoSchema = z.object({
  dataInicio: z.coerce.date().optional(),
  dataFim: z.coerce.date().optional(),
  visitanteId: z.number().int().positive().optional(),
  unidadeId: z.number().int().positive().optional(),
  somenteAbertas: z.boolean().optional()
});