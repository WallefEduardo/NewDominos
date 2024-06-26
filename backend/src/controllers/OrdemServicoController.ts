import { Request, Response } from 'express';
import OrdemServico from '../models/OrdemServico';
import Colaborador from '../models/Colaborador';


// Função para criar uma nova ordem de serviço
export const addOrdemServico = async (req: Request, res: Response) => {
  try {
    const { numOS, cliente, descricao, colaboradorIds, dataInicio, dataTermino, horaInicio, horaTermino } = req.body;

    // Validar se todos os colaboradores existem
    for (const id of colaboradorIds) {
      const colaborador = await Colaborador.findByPk(id);
      if (!colaborador) {
        return res.status(404).json({ error: `Colaborador com ID ${id} não encontrado` });
      }
    }

    // Criação da ordem de serviço
    const ordemServico = await OrdemServico.create({
      numOS,
      cliente,
      descricao,
      colaboradorIds: JSON.stringify(colaboradorIds),
      dataInicio, // Datas já formatadas como strings
      dataTermino, // Datas já formatadas como strings
      horaInicio,
      horaTermino,
      status: 'Aguardando' // Define o status inicial como "Aguardando"
    });

    return res.status(201).json(ordemServico);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Função para listar todas as ordens de serviço
export const listOrdensServico = async (req: Request, res: Response) => {
  try {
    const ordensServico = await OrdemServico.findAll();
    return res.status(200).json(ordensServico);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Função para obter uma ordem de serviço pelo ID
export const getOrdemServicoById = async (req: Request, res: Response) => {
  try {
    const ordemServico = await OrdemServico.findByPk(req.params.id);
    if (ordemServico) {
      return res.status(200).json(ordemServico);
    }
    return res.status(404).json({ message: 'Ordem de serviço não encontrada' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Função para atualizar uma ordem de serviço pelo ID
export const updateOrdemServicoById = async (req: Request, res: Response) => {
  try {
    const { numOS, cliente, descricao, colaboradorIds, dataInicio, dataTermino, horaInicio, horaTermino, status } = req.body;

    // Validar se todos os colaboradores existem
    for (const id of colaboradorIds) {
      const colaborador = await Colaborador.findByPk(id);
      if (!colaborador) {
        return res.status(404).json({ error: `Colaborador com ID ${id} não encontrado` });
      }
    }

    // Atualização da ordem de serviço
    const [affectedRows, [updatedOrdemServico]] = await OrdemServico.update(
      {
        numOS,
        cliente,
        descricao,
        colaboradorIds: JSON.stringify(colaboradorIds),
        dataInicio, // Datas já formatadas como strings
        dataTermino, // Datas já formatadas como strings
        horaInicio,
        horaTermino,
        status // Atualiza o status
      },
      { where: { id: req.params.id }, returning: true }
    );

    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Ordem de serviço não encontrada' });
    }

    return res.status(200).json(updatedOrdemServico);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Função para deletar uma ordem de serviço pelo ID
export const deleteOrdemServicoById = async (req: Request, res: Response) => {
  try {
    const result = await OrdemServico.destroy({ where: { id: req.params.id } });
    if (result === 0) {
      return res.status(404).json({ message: 'Ordem de serviço não encontrada' });
    }
    return res.status(200).json({ message: 'Ordem de serviço deletada com sucesso' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
