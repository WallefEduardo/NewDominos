// src/services/DeclinioService/ClassificacaoService.ts

import { Classificacao } from '../../models/Classificacao';  // Atualizado o caminho para o novo modelo

interface ClassificacaoData {
  name: string;  // Altere a chave para 'name' se o campo no modelo for 'name'
}

export async function getAllClassificacoes(): Promise<Classificacao[]> {
  return await Classificacao.findAll();
}

export async function createClassificacao(data: ClassificacaoData): Promise<Classificacao> {
  return await Classificacao.create(data);
}

export async function getClassificacaoById(id: number): Promise<Classificacao | null> {
  return await Classificacao.findByPk(id);
}

export async function updateClassificacao(id: number, data: ClassificacaoData): Promise<[number, Classificacao[]]> {
  return await Classificacao.update(data, {
    where: { id },
    returning: true
  });
}

export async function deleteClassificacao(id: number): Promise<number> {
  return await Classificacao.destroy({
    where: { id }
  });
}
