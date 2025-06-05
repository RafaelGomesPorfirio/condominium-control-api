import { prisma } from '../services/prisma';
import { MovimentacaoCreateInput, MovimentacaoUpdateInput, MovimentacaoFilter } from '../types/movimentacao.type';

export const createMovimentacao = async (data: MovimentacaoCreateInput) => {
  return prisma.movimentacao.create({
    data: {
      visitanteId: data.visitanteId,
      unidadeId: data.unidadeId,
      entrada: data.entrada || new Date()
    },
    include: {
      visitante: true,
      unidadeVisitada: {
        include: {
          condominio: true
        }
      }
    }
  });
};

export const findMovimentacaoById = async (id: number) => {
  return prisma.movimentacao.findUnique({
    where: { id },
    include: {
      visitante: true,
      unidadeVisitada: {
        include: {
          condominio: true
        }
      }
    }
  });
};

export const findMovimentacoes = async (filter: MovimentacaoFilter) => {
  return prisma.movimentacao.findMany({
    where: {
      AND: [
        { entrada: { gte: filter.dataInicio } },
        { 
          OR: [
            { saida: { lte: filter.dataFim } },
            ...(filter.dataFim && !filter.somenteAbertas ? [{ saida: null }] : [])
          ]
        },
        filter.visitanteId ? { visitanteId: filter.visitanteId } : {},
        filter.unidadeId ? { unidadeId: filter.unidadeId } : {},
        filter.somenteAbertas ? { saida: null } : {}
      ]
    },
    include: {
      visitante: true,
      unidadeVisitada: {
        include: {
          condominio: true
        }
      }
    },
    orderBy: { entrada: 'desc' }
  });
};

export const updateMovimentacao = async (id: number, data: MovimentacaoUpdateInput) => {
  return prisma.movimentacao.update({
    where: { id },
    data: {
      saida: data.saida,
      unidadeId: data.unidadeId
    },
    include: {
      visitante: true,
      unidadeVisitada: {
        include: {
          condominio: true
        }
      }
    }
  });
};

export const deleteMovimentacao = async (id: number) => {
  return prisma.movimentacao.delete({
    where: { id }
  });
};