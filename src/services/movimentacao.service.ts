import * as movimentacaoRepository from '../repositories/movimentacao.repository';
import { MovimentacaoCreateInput, MovimentacaoUpdateInput, MovimentacaoFilter } from '../types/movimentacao.type';

export const createMovimentacao = async (data: MovimentacaoCreateInput) => {
  const movAberta = await movimentacaoRepository.findMovimentacoes({ 
    visitanteId: data.visitanteId,
    somenteAbertas: true
  });
  
  if (movAberta.length > 0) {
    throw new Error('Visitante já possui uma movimentação em aberto');
  }

  return movimentacaoRepository.createMovimentacao(data);
};

export const getMovimentacao = async (id: number) => {
  return movimentacaoRepository.findMovimentacaoById(id);
};

export const getMovimentacoes = async (filter: MovimentacaoFilter) => {
  return movimentacaoRepository.findMovimentacoes(filter);
};

export const updateMovimentacao = async (id: number, data: MovimentacaoUpdateInput) => {
  return movimentacaoRepository.updateMovimentacao(id, data);
};

export const deleteMovimentacao = async (id: number) => {
  return movimentacaoRepository.deleteMovimentacao(id);
};