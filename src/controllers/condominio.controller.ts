import { Request, Response } from 'express';
import * as condominioService from '../services/condominio.service';
import { createCondominioSchema, updateCondominioSchema } from '../utils/validators/condominio.validator';
import { validate } from '../middlewares/validate';

export const getAllCondominios = async (req: Request, res: Response) => {
  try {
    const condominios = await condominioService.findAllCondominios();
    res.json(condominios);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllCondominiosWithUnidades = async (req: Request, res: Response) => {
  try {
    const condominios = await condominioService.findAllCondominiosWithUnidades();
    res.json(condominios);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getCondominioById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const condominio = await condominioService.findCondominioById(id);
    if (!condominio) {
      res.status(404).json({ error: 'Condomínio não encontrado' });
      return;
    }
    res.json(condominio);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createCondominio = [
  validate(createCondominioSchema),
  async (req: Request, res: Response) => {
    try {
      const condominio = await condominioService.createCondominio(req.body);
      res.status(201).json(condominio);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
];

export const updateCondominio = [
  validate(updateCondominioSchema),
  async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const condominio = await condominioService.updateCondominio(id, req.body);
      if (!condominio) {
        res.status(404).json({ error: 'Condomínio não encontrado' });
        return;
      }
      res.json(condominio);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
];

export const deleteCondominio = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await condominioService.deleteCondominio(id);
    res.json({ message: 'Condomínio removido com sucesso' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};