import * as condominioRepository from '../repositories/condominio.repository';
import { CondominioCreateInput, CondominioUpdateInput } from '../types/condominio.type';
import { prisma } from '../services/prisma';

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
  const existingByAddress = await prisma.condominio.findFirst({
    where: { enderecoCondominio: data.enderecoCondominio }
  });
  
  if (existingByAddress) {
    throw new Error('Já existe um condomínio cadastrado com este endereço');
  }

  return condominioRepository.createCondominio(data);
};

export const updateCondominio = async (id: number, data: CondominioUpdateInput) => {

  if (data.enderecoCondominio) {
    const existingByAddress = await prisma.condominio.findFirst({
      where: {
        enderecoCondominio: data.enderecoCondominio,
        id: { not: id }
      }
    });
    
    if (existingByAddress) {
      throw new Error('Já existe outro condomínio com este endereço');
    }
  }

  return condominioRepository.updateCondominio(id, data);
};

export const deleteCondominio = async (id: number) => {
  return condominioRepository.deleteCondominio(id);
};