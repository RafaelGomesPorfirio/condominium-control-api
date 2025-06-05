import * as condominioRepository from '../repositories/condominio.repository';
import { CondominioCreateInput, CondominioUpdateInput } from '../types/condominio.type';

export const findAllCondominios = async () => {
  return condominioRepository.findAllCondominios();
};

export const findAllCondominiosWithUnidades = async () => {
  return condominioRepository.findAllCondominiosWithUnidades();
};

export const findCondominioById = async (id: number) => {
  return condominioRepository.findCondominioById(id);
};

export const createCondominio = async (data: CondominioCreateInput) => {
  return condominioRepository.createCondominio(data);
};

export const updateCondominio = async (id: number, data: CondominioUpdateInput) => {
  return condominioRepository.updateCondominio(id, data);
};

export const deleteCondominio = async (id: number) => {
  return condominioRepository.deleteCondominio(id);
};