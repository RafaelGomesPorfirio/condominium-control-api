import { prisma } from '../services/prisma';
import { CondominioCreateInput, CondominioUpdateInput } from '../types/condominio.type';

export const findAllCondominios = async () => {
  return prisma.condominio.findMany();
};

export const findAllCondominiosWithUnidades = async () => {
  return prisma.condominio.findMany({
    include: {
      unidade: true,
    },
  });
};

export const findCondominioById = async (id: number) => {
  return prisma.condominio.findUnique({
    where: { id },
    include: {
      unidade: true,
    },
  });
};

export const createCondominio = async (data: CondominioCreateInput) => {
  return prisma.condominio.create({ data });
};

export const updateCondominio = async (id: number, data: CondominioUpdateInput) => {
  return prisma.condominio.update({
    where: { id },
    data,
  });
};

export const deleteCondominio = async (id: number) => {
  return prisma.condominio.delete({
    where: { id },
  });
};