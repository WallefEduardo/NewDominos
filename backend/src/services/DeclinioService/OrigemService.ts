// src/services/DeclinioService/OrigemService.ts

import { Origem } from '../../models/Origem';  // Atualizado o caminho para o novo modelo

interface OrigemData {
  name: string;
  motivoId: number;  // Adicionei as chaves para 'motivoId' e 'classificacaoId'
  classificacaoId: number;
}

export async function getAllOrigens(): Promise<Origem[]> {
  return await Origem.findAll();
}

export async function createOrigem(data: OrigemData): Promise<Origem> {
  return await Origem.create(data);
}

export async function getOrigemById(id: number): Promise<Origem | null> {
  return await Origem.findByPk(id);
}

export async function updateOrigem(id: number, data: OrigemData): Promise<[number, Origem[]]> {
  return await Origem.update(data, {
    where: { id },
    returning: true
  });
}

export async function deleteOrigem(id: number): Promise<number> {
  return await Origem.destroy({
    where: { id }
  });
}
