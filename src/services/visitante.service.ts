import * as visitanteRepository from '../repositories/visitante.repository';
import { VisitanteCreateInput, VisitanteUpdateInput } from '../types/visitante.type';
import { prisma } from '../services/prisma';

export const createVisitante = async (data: VisitanteCreateInput) => {
  const existingByDocument = await prisma.visitante.findUnique({
    where: { documentoVisitante: data.documentoVisitante }
  });
  
  if (existingByDocument) {
    throw new Error('Já existe um visitante cadastrado com este documento');
  }

  if (data.telefoneVisitante) {
    const existingByPhone = await prisma.visitante.findFirst({
      where: { telefoneVisitante: data.telefoneVisitante }
    });
    
    if (existingByPhone) {
      throw new Error('Já existe um visitante cadastrado com este telefone');
    }
  }

  return visitanteRepository.createVisitante(data);
};

export const getAllVisitantes = async () => {
  return visitanteRepository.findAllVisitantes();
};

export const getVisitanteById = async (id: number) => {
  return visitanteRepository.findVisitanteById(id);
};

export const updateVisitante = async (id: number, data: VisitanteUpdateInput) => {
  if (data.documentoVisitante) {
    const existingByDocument = await prisma.visitante.findFirst({
      where: {
        documentoVisitante: data.documentoVisitante,
        id: { not: id } 
      }
    });
    
    if (existingByDocument) {
      throw new Error('Já existe outro visitante com este documento');
    }
  }

  if (data.telefoneVisitante) {
    const existingByPhone = await prisma.visitante.findFirst({
      where: {
        telefoneVisitante: data.telefoneVisitante,
        id: { not: id } 
      }
    });
    
    if (existingByPhone) {
      throw new Error('Já existe outro visitante com este telefone');
    }
  }

  return visitanteRepository.updateVisitante(id, data);
};

export const deleteVisitante = async (id: number) => {
  return visitanteRepository.deleteVisitante(id);
};