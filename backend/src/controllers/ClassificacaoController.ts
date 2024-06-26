// src/controllers/ClassificacaoController.ts

import { Request, Response } from 'express';
import * as ClassificacaoService from '../services/DeclinioService/ClassificacaoService';

export async function getAllClassificacoes(req: Request, res: Response): Promise<void> {
  try {
    const classificacoes = await ClassificacaoService.getAllClassificacoes();
    res.status(200).json(classificacoes);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar classificações' });
  }
}

export async function createClassificacao(req: Request, res: Response): Promise<void> {
  try {
    const newClassificacao = await ClassificacaoService.createClassificacao(req.body);
    res.status(201).json(newClassificacao);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar classificação' });
  }
}

export async function getClassificacaoById(req: Request, res: Response): Promise<void> {
  try {
    const classificacao = await ClassificacaoService.getClassificacaoById(Number(req.params.id));
    if (classificacao) {
      res.status(200).json(classificacao);
    } else {
      res.status(404).json({ error: 'Classificação não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar classificação' });
  }
}

export async function updateClassificacao(req: Request, res: Response): Promise<void> {
  try {
    const [updated] = await ClassificacaoService.updateClassificacao(Number(req.params.id), req.body);
    if (updated) {
      const updatedClassificacao = await ClassificacaoService.getClassificacaoById(Number(req.params.id));
      res.status(200).json(updatedClassificacao);
    } else {
      res.status(404).json({ error: 'Classificação não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar classificação' });
  }
}

export async function deleteClassificacao(req: Request, res: Response): Promise<void> {
  try {
    const deleted = await ClassificacaoService.deleteClassificacao(Number(req.params.id));
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Classificação não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar classificação' });
  }
}
