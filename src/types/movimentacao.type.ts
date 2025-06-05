import { Visitante } from './visitante.type';
import { Unidade } from './unidade.type';

export interface Movimentacao {
  id: number;
  entrada: Date;
  saida?: Date | null;
  visitanteId: number;
  unidadeId: number;
  unidadeVisitada: Unidade;
  visitante: Visitante;
}

export interface MovimentacaoCreateInput {
  visitanteId: number;
  unidadeId: number;
  entrada?: Date;
}

export interface MovimentacaoUpdateInput {
  saida?: Date;
  unidadeId?: number;
}

// Para consultas avançadas
export interface MovimentacaoFilter {
  dataInicio?: Date;
  dataFim?: Date;
  visitanteId?: number;
  unidadeId?: number;
  somenteAbertas?: boolean;
}