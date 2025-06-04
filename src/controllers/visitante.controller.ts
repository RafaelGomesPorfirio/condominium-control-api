import { Request, Response } from 'express';
import * as visitanteService from '../services/visitante.service';

export async function getAllVisitantes(req: Request, res: Response): Promise<void> {
  try {
    const visitantes = await visitanteService.getAllVisitantes();
    res.json(visitantes);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function createVisitante(req: Request, res: Response): Promise<void> {
  try {
    const visitante = await visitanteService.createVisitante(req.body);
    res.status(201).json(visitante);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function getVisitanteById(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const visitante = await visitanteService.getVisitanteById(id);
    if (!visitante) {
      res.status(404).json({ error: 'Visitante não encontrado' });
      return;
    }
    res.json(visitante);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateVisitante(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const visitanteAtualizado = await visitanteService.updateVisitante(id, req.body);
    if (!visitanteAtualizado) {
      res.status(404).json({ error: 'Visitante não encontrado para atualizar' });
      return;
    }
    res.json(visitanteAtualizado);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function deleteVisitante(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const visitanteDeletado = await visitanteService.deleteVisitante(id);
    if (!visitanteDeletado) {
      res.status(404).json({ error: 'Visitante não encontrado para excluir' });
      return;
    }
    res.json({ message: 'Visitante removido com sucesso' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}