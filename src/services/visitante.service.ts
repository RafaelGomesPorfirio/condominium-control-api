import * as visitanteRepository from '../repositories/visitante.repository';
import { VisitanteCreateInput, VisitanteUpdateInput } from '../types/visitante.type';

export const createVisitante = async (data: VisitanteCreateInput) => {
  return visitanteRepository.createVisitante(data);
};

export const getAllVisitantes = async () => {
  return visitanteRepository.findAllVisitantes();
};

export const getVisitanteById = async (id: number) => {
  return visitanteRepository.findVisitanteById(id);
};

export const updateVisitante = async (id: number, data: VisitanteUpdateInput) => {
  return visitanteRepository.updateVisitante(id, data);
};

export const deleteVisitante = async (id: number) => {
  return visitanteRepository.deleteVisitante(id);
};