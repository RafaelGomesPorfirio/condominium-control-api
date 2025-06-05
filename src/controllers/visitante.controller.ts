import { Request, Response } from 'express';
import * as visitanteService from '../services/visitante.service';
import { createVisitanteSchema, updateVisitanteSchema } from '../utils/validators/visitante.validator';
import { validate } from '../middlewares/validate';

export const getAllVisitantes = async (req: Request, res: Response) => {
  try {
    const visitantes = await visitanteService.getAllVisitantes();
    res.json(visitantes);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createVisitante = [
  validate(createVisitanteSchema),
  async (req: Request, res: Response) => {
    try {
      const visitante = await visitanteService.createVisitante(req.body);
      res.status(201).json(visitante);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
];

export const getVisitanteById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const visitante = await visitanteService.getVisitanteById(id);
    if (!visitante) {
      res.status(404).json({ error: 'Visitante não encontrado' });
      return;
    }
    res.json(visitante);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateVisitante = [
  validate(updateVisitanteSchema),
  async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const visitante = await visitanteService.updateVisitante(id, req.body);
      if (!visitante) {
        res.status(404).json({ error: 'Visitante não encontrado' });
        return;
      }
      res.json(visitante);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
];

export const deleteVisitante = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await visitanteService.deleteVisitante(id);
    res.json({ message: 'Visitante removido com sucesso' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};