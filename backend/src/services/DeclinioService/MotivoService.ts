// src/services/DeclinioService/MotivoService.ts

import { Motivo } from '../../models/Motivo';  // Atualizado o caminho para o novo modelo

interface MotivoData {
  name: string;  // Altere a chave para 'name' se o campo no modelo for 'name'
}

export async function getAllMotivos(): Promise<Motivo[]> {
  return await Motivo.findAll();
}

export async function createMotivo(data: MotivoData): Promise<Motivo> {
  return await Motivo.create(data);
}

export async function getMotivoById(id: number): Promise<Motivo | null> {
  return await Motivo.findByPk(id);
}

export async function updateMotivo(id: number, data: MotivoData): Promise<[number, Motivo[]]> {
  return await Motivo.update(data, {
    where: { id },
    returning: true
  });
}

export async function deleteMotivo(id: number): Promise<number> {
  return await Motivo.destroy({
    where: { id }
  });
}
