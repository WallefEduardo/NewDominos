import { Request, Response } from 'express';
import { Sequelize } from 'sequelize-typescript';
import { Origem } from '../models/Origem';
import { Motivo } from '../models/Motivo';
import { Classificacao } from '../models/Classificacao';

export async function getAggregatedDeclinioData(req: Request, res: Response): Promise<void> {
  try {
    const data = await Origem.findAll({
      include: [
        {
          model: Motivo,
          as: 'motivo',
          attributes: ['name']
        },
        {
          model: Classificacao,
          as: 'classificacao',
          attributes: ['name']
        }
      ],
      attributes: [
        [Sequelize.fn('date_trunc', 'day', Sequelize.col('Origem.createdAt')), 'date'],
        'motivo.name',
        'classificacao.name',
        [Sequelize.fn('count', Sequelize.col('Origem.id')), 'totalDeclinios']
      ],
      group: ['date', 'motivo.id', 'motivo.name', 'classificacao.id', 'classificacao.name']
    });

    res.status(200).json(data);
  } catch (error) {
    console.error("Erro ao buscar dados agregados de declínio", error);
    res.status(500).send({
      message: 'Erro ao buscar dados agregados de declínio',
      error: error.message
    });
  }
}