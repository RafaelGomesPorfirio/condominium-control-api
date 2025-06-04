// src/utils/validators/condominio.validator.ts
import { z } from 'zod';

export const createCondominioSchema = z.object({
  nome: z.string({
    required_error: 'Nome é obrigatório',
  }).min(3, 'Nome deve ter no mínimo 3 caracteres'),

  endereco: z.string({
    required_error: 'Endereço é obrigatório',
  }).min(5, 'Endereço deve ter no mínimo 5 caracteres'),
});
