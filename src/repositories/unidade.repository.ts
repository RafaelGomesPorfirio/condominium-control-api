import { prisma } from '../services/prisma';
import { UnidadeCreateInput, UnidadeUpdateInput } from '../types/unidade.type';

export const findAllUnidades = async () => {
  return prisma.unidade.findMany({
    include: {
      condominio: true,
    },
  });
};

export const findUnidadesByCondominio = async (condominioId: number) => {
  return prisma.unidade.findMany({
    where: { condominioId },
    include: {
      condominio: true,
    },
  });
};

export const findUnidadeById = async (id: number) => {
  return prisma.unidade.findUnique({
    where: { id },
    include: {
      condominio: true,
    },
  });
};

export const createUnidade = async (data: UnidadeCreateInput) => {
  return prisma.unidade.create({ data });
};

export const updateUnidade = async (id: number, data: UnidadeUpdateInput) => {
  return prisma.unidade.update({
    where: { id },
    data,
  });
};

export const deleteUnidade = async (id: number) => {
  return prisma.unidade.delete({
    where: { id },
  });
};