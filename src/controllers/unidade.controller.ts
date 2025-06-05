import { Request, Response } from 'express';
import * as unidadeService from '../services/unidade.service';
import { createUnidadeSchema, updateUnidadeSchema } from '../utils/validators/unidade.validator';
import { validate } from '../middlewares/validate';

export const getAllUnidades = async (req: Request, res: Response) => {
  try {
    const unidades = await unidadeService.findAllUnidades();
    res.json(unidades);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getUnidadesByCondominio = async (req: Request, res: Response) => {
  try {
    const condominioId = parseInt(req.params.condominioId);
    const unidades = await unidadeService.findUnidadesByCondominio(condominioId);
    res.json(unidades);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getUnidadeById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const unidade = await unidadeService.findUnidadeById(id);
    if (!unidade) {
      res.status(404).json({ error: 'Unidade não encontrada' });
      return;
    }
    res.json(unidade);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createUnidade = [
  validate(createUnidadeSchema),
  async (req: Request, res: Response) => {
    try {
      const unidade = await unidadeService.createUnidade(req.body);
      res.status(201).json(unidade);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
];

export const updateUnidade = [
  validate(updateUnidadeSchema),
  async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const unidade = await unidadeService.updateUnidade(id, req.body);
      if (!unidade) {
        res.status(404).json({ error: 'Unidade não encontrada' });
        return;
      }
      res.json(unidade);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
];

export const deleteUnidade = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await unidadeService.deleteUnidade(id);
    res.json({ message: 'Unidade removida com sucesso' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};