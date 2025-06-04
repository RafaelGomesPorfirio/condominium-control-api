import * as visitanteRepo from '../repositories/visitante.repository';

export async function createVisitante(data: { nome: string; documento: string; telefone?: string }) {
  return visitanteRepo.createVisitante(data);
}

export async function getAllVisitantes() {
  return visitanteRepo.findAllVisitantes();
}

export async function getVisitanteById(id: string) {
  return visitanteRepo.findVisitanteById(id);
}

export async function updateVisitante(id: string, data: { nome: string; documento: string; telefone?: string }) {
  return visitanteRepo.updateVisitante(id, data);
}

export async function deleteVisitante(id: string) {
  return visitanteRepo.deleteVisitante(id);
}
