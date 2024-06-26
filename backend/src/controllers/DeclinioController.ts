// src/controllers/DeclinioController.ts

import { Request, Response } from 'express';
import { Declinio } from '../models/Declinio';
import { Motivo } from '../models/Motivo';
import { Origem } from '../models/Origem';
import { Classificacao } from '../models/Classificacao';

export async function createDeclinio(req: Request, res: Response): Promise<void> {
  const { motivoId, origemId, classificacaoId, observacao } = req.body;

  try {
    const newDeclinio = await Declinio.create({
      motivoId,
      origemId,
      classificacaoId,
      observacao,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    res.status(201).json(newDeclinio);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao registrar declínio', details: error.message });
  }
}

export async function getAllDeclinios(req: Request, res: Response): Promise<void> {
  try {
    const declinios = await Declinio.findAll({
      include: [
        { model: Motivo, attributes: ['name'] },
        { model: Origem, attributes: ['name'] },
        { model: Classificacao, attributes: ['name'] }
      ]
    });
    res.status(200).json(declinios);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar declínios', details: error.message });
  }
}
