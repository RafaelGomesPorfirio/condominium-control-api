import { Request, Response } from 'express';
import * as movimentacaoService from '../services/movimentacao.service';

export const createMovimentacao = async (req: Request, res: Response): Promise<void> => {
  try {
    const movimentacao = await movimentacaoService.createMovimentacao(req.body);
    res.status(201).json(movimentacao);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getMovimentacao = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const movimentacao = await movimentacaoService.getMovimentacao(id);

    if (!movimentacao) {
      res.status(404).json({ error: 'Movimentação não encontrada' });
      return;
    }

    res.json(movimentacao);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getMovimentacoes = async (req: Request, res: Response): Promise<void> => {
  try {
    const movimentacoes = await movimentacaoService.getMovimentacoes(req.query);
    res.json(movimentacoes);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateMovimentacao = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const movimentacao = await movimentacaoService.updateMovimentacao(id, req.body);

    if (!movimentacao) {
      res.status(404).json({ error: 'Movimentação não encontrada' });
      return;
    }

    res.json(movimentacao);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteMovimentacao = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    await movimentacaoService.deleteMovimentacao(id);
    res.json({ message: 'Movimentação removida com sucesso' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};