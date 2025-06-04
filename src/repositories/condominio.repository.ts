import { PrismaClient } from '../generated/prisma';
import { CondominioCreateInput, CondominioUpdateInput } from '../types/condominio.type';

const prisma = new PrismaClient();

export const getAllCondominios = async () => {
  return await prisma.condominio.findMany({
    include: { unidade: true },  // inclui as unidades relacionadas
  });
};

export const getCondominioById = async (id: number) => {
  return await prisma.condominio.findUnique({
    where: { id },
    include: { unidade: true },
  });
};

export const createCondominio = async (data: CondominioCreateInput) => {
  return await prisma.condominio.create({ data });
};

export const updateCondominio = async (id: number, data: CondominioUpdateInput) => {
  return await prisma.condominio.update({
    where: { id },
    data,
  });
};

export const deleteCondominio = async (id: number) => {
  return await prisma.condominio.delete({
    where: { id },
  });
};
