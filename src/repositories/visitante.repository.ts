import { prisma } from '../services/prisma';

export interface VisitanteData {
  nome: string;
  documento: string;
  telefone?: string | null; 
}

export async function createVisitante(data: VisitanteData) {
  return prisma.visitante.create({
    data: {
      nome: data.nome,
      documento: data.documento,
      telefone: data.telefone,
    }
  });
}

export async function findAllVisitantes() {
  return prisma.visitante.findMany();
}

export async function findVisitanteById(id: string) {
  return prisma.visitante.findUnique({
     where: { id: Number(id) },
  });
}

export async function updateVisitante(id: string, data: VisitanteData) {
  try {
    return await prisma.visitante.update({
      where: { id: Number(id) },
      data: {
        nome: data.nome,
        documento: data.documento,
        telefone: data.telefone,
      }
    });
  } catch (error) {
    console.error('Erro updateVisitante:', error);
    return null;
  }
}

export async function deleteVisitante(id: string) {
  try {
    await prisma.visitante.delete({
       where: { id: Number(id) },
    });
    return true;
  } catch (error) {
    console.error('Erro deleteVisitante:', error);
    return false;
  }
}