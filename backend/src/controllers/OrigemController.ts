// src/controllers/OrigemController.ts

import { Request, Response } from 'express';
import * as OrigemService from '../services/DeclinioService/OrigemService';

export async function getAllOrigens(req: Request, res: Response): Promise<void> {
  try {
    const origens = await OrigemService.getAllOrigens();
    res.status(200).json(origens);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar origens' });
  }
}

export async function createOrigem(req: Request, res: Response): Promise<void> {
  try {
    const newOrigem = await OrigemService.createOrigem(req.body);
    res.status(201).json(newOrigem);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar origem' });
  }
}

export async function getOrigemById(req: Request, res: Response): Promise<void> {
  try {
    const origem = await OrigemService.getOrigemById(Number(req.params.id));
    if (origem) {
      res.status(200).json(origem);
    } else {
      res.status(404).json({ error: 'Origem não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar origem' });
  }
}

export async function updateOrigem(req: Request, res: Response): Promise<void> {
  try {
    const [updated] = await OrigemService.updateOrigem(Number(req.params.id), req.body);
    if (updated) {
      const updatedOrigem = await OrigemService.getOrigemById(Number(req.params.id));
      res.status(200).json(updatedOrigem);
    } else {
      res.status(404).json({ error: 'Origem não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar origem' });
  }
}

export async function deleteOrigem(req: Request, res: Response): Promise<void> {
  try {
    const deleted = await OrigemService.deleteOrigem(Number(req.params.id));
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Origem não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar origem' });
  }
}
