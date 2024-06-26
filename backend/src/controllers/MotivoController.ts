// src/controllers/MotivoController.ts

import { Request, Response } from 'express';
import * as MotivoService from '../services/DeclinioService/MotivoService';

export async function getAllMotivos(req: Request, res: Response): Promise<void> {
  try {
    const motivos = await MotivoService.getAllMotivos();
    res.status(200).json(motivos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar motivos' });
  }
}

export async function createMotivo(req: Request, res: Response): Promise<void> {
  try {
    const newMotivo = await MotivoService.createMotivo(req.body);
    res.status(201).json(newMotivo);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar motivo' });
  }
}

export async function getMotivoById(req: Request, res: Response): Promise<void> {
  try {
    const motivo = await MotivoService.getMotivoById(Number(req.params.id));
    if (motivo) {
      res.status(200).json(motivo);
    } else {
      res.status(404).json({ error: 'Motivo não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar motivo' });
  }
}

export async function updateMotivo(req: Request, res: Response): Promise<void> {
  try {
    const [updated] = await MotivoService.updateMotivo(Number(req.params.id), req.body);
    if (updated) {
      const updatedMotivo = await MotivoService.getMotivoById(Number(req.params.id));
      res.status(200).json(updatedMotivo);
    } else {
      res.status(404).json({ error: 'Motivo não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar motivo' });
  }
}

export async function deleteMotivo(req: Request, res: Response): Promise<void> {
  try {
    const deleted = await MotivoService.deleteMotivo(Number(req.params.id));
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Motivo não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar motivo' });
  }
}
