import * as condominioRepository from '../repositories/condominio.repository';
import { CondominioCreateInput, CondominioUpdateInput } from '../types/condominio.type';

export const findAllCondominios = async () => {
  return await condominioRepository.getAllCondominios();
};

export const findCondominioById = async (id: number) => {
  return await condominioRepository.getCondominioById(id);
};

export const createCondominio = async (data: CondominioCreateInput) => {
  return await condominioRepository.createCondominio(data);
};

export const updateCondominio = async (id: number, data: CondominioUpdateInput) => {
  return await condominioRepository.updateCondominio(id, data);
};

export const deleteCondominio = async (id: number) => {
  return await condominioRepository.deleteCondominio(id);
};
