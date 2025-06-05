import * as unidadeRepository from '../repositories/unidade.repository';
import { UnidadeCreateInput, UnidadeUpdateInput } from '../types/unidade.type';

export const findAllUnidades = async () => {
  return unidadeRepository.findAllUnidades();
};

export const findUnidadesByCondominio = async (condominioId: number) => {
  return unidadeRepository.findUnidadesByCondominio(condominioId);
};

export const findUnidadeById = async (id: number) => {
  return unidadeRepository.findUnidadeById(id);
};

export const createUnidade = async (data: UnidadeCreateInput) => {
  return unidadeRepository.createUnidade(data);
};

export const updateUnidade = async (id: number, data: UnidadeUpdateInput) => {
  return unidadeRepository.updateUnidade(id, data);
};

export const deleteUnidade = async (id: number) => {
  return unidadeRepository.deleteUnidade(id);
};