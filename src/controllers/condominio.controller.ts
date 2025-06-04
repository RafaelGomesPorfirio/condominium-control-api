import { Request, Response, NextFunction } from 'express';
import * as condominioService from '../services/condominio.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export const getAllCondominios = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const condominios = await condominioService.findAllCondominios();
    res.json(condominios);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar condomínios' });
  }
};

export const getCondominioById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const condominio = await condominioService.findCondominioById(Number(id));
    if (!condominio) {
      res.status(404).json({ error: 'Condomínio não encontrado' });
      return;
    }
    res.json(condominio);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar condomínio' });
  }
};

export const getUnidadesByCondominio = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const condominio = await condominioService.findCondominioById(Number(id));
    if (!condominio) {
      res.status(404).json({ error: 'Condomínio não encontrado' });
      return;
    }
    res.json(condominio.unidade);  // retorna só as unidades do condomínio
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar unidades' });
  }
};

export const createCondominio = async (req: Request, res: Response): Promise<void> => {
  const { nome, endereco } = req.body;
  try {
    const newCondominio = await condominioService.createCondominio({ nome, endereco });
    res.status(201).json(newCondominio);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        res.status(400).json({ error: 'Condomínio com este nome ou endereço já existe' });
        return;
      }
    }
    res.status(500).json({
      error: 'Erro ao criar condomínio',
      details: error instanceof Error ? error.message : String(error)
    });
  }
};

export const updateCondominio = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { nome, endereco } = req.body;
  try {
    const updatedCondominio = await condominioService.updateCondominio(Number(id), { nome, endereco });
    if (!updatedCondominio) {
      res.status(404).json({ error: 'Condomínio não encontrado' });
      return;
    }
    res.json(updatedCondominio);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        res.status(400).json({ error: 'Condomínio com este nome ou endereço já existe' });
        return;
      }
    }
    res.status(500).json({
      error: 'Erro ao atualizar condomínio',
      details: error instanceof Error ? error.message : String(error)
    });
  }
};

export const deleteCondominio = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const deletedCondominio = await condominioService.deleteCondominio(Number(id));
    if (!deletedCondominio) {
      res.status(404).json({ error: 'Condomínio não encontrado' });
      return;
    }
    res.json({ message: 'Condomínio deletado com sucesso' });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2003') {
        res.status(400).json({
          error: 'Não é possível deletar condomínio com unidades vinculadas'
        });
        return;
      }
    }
    res.status(500).json({
      error: 'Erro ao deletar condomínio',
      details: error instanceof Error ? error.message : String(error)
    });
  }
};
