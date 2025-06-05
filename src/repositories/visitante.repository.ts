import { prisma } from '../services/prisma';
import { VisitanteCreateInput, VisitanteUpdateInput } from '../types/visitante.type';

export const createVisitante = async (data: VisitanteCreateInput) => {
  return prisma.visitante.create({ data });
};

export const findAllVisitantes = async () => {
  return prisma.visitante.findMany();
};

export const findVisitanteById = async (id: number) => {
  return prisma.visitante.findUnique({
    where: { id },
  });
};

export const updateVisitante = async (id: number, data: VisitanteUpdateInput) => {
  return prisma.visitante.update({
    where: { id },
    data,
  });
};

export const deleteVisitante = async (id: number) => {
  return prisma.visitante.delete({
    where: { id },
  });
};