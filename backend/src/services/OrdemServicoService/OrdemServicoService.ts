import OrdemServico from '../../models/OrdemServico';
import Colaborador from '../../models/Colaborador';

interface OrdemServicoData {
  numOS: string;
  cliente: string;
  descricao: string;
  colaboradorIds: string[];
  dataInicio: string; // Mudança para string
  dataTermino: string; // Mudança para string
  horaInicio: string;
  horaTermino: string;
  status: string;
}

// Função auxiliar para formatar datas no formato 'YYYY-MM-DD'
const formatDate = (date: string | Date) => {
  return new Date(date).toISOString().split('T')[0];
};

export const createOrdemServico = async (data: OrdemServicoData) => {
  const { numOS, cliente, descricao, colaboradorIds, dataInicio, dataTermino, horaInicio, horaTermino, status } = data;

  // Verificação se os colaboradores existem
  for (const id of colaboradorIds) {
    const colaborador = await Colaborador.findByPk(id);
    if (!colaborador) {
      throw new Error(`Colaborador com ID ${id} não encontrado`);
    }
  }

  // Formatação das datas
  const formattedDataInicio = formatDate(dataInicio);
  const formattedDataTermino = formatDate(dataTermino);

  const ordemServico = await OrdemServico.create({
    numOS,
    cliente,
    descricao,
    colaboradorIds: JSON.stringify(colaboradorIds),
    dataInicio: formattedDataInicio,
    dataTermino: formattedDataTermino,
    horaInicio,
    horaTermino,
    status
  });

  return ordemServico;
};

export const getAllOrdensServico = async () => {
  const ordensServico = await OrdemServico.findAll();
  // Converte as datas de volta para strings legíveis
  return ordensServico.map((ordem) => ({
    ...ordem.toJSON(),
    dataInicio: formatDate(ordem.dataInicio),
    dataTermino: formatDate(ordem.dataTermino),
  }));
};

export const getOrdemServicoById = async (id: string) => {
  const ordemServico = await OrdemServico.findByPk(id);
  if (!ordemServico) {
    throw new Error('Ordem de serviço não encontrada');
  }
  // Converte as datas de volta para strings legíveis
  return {
    ...ordemServico.toJSON(),
    dataInicio: formatDate(ordemServico.dataInicio),
    dataTermino: formatDate(ordemServico.dataTermino),
  };
};

export const updateOrdemServico = async (id: string, data: OrdemServicoData) => {
  const { numOS, cliente, descricao, colaboradorIds, dataInicio, dataTermino, horaInicio, horaTermino, status } = data;

  // Verificação se os colaboradores existem
  for (const colaboradorId of colaboradorIds) {
    const colaborador = await Colaborador.findByPk(colaboradorId);
    if (!colaborador) {
      throw new Error(`Colaborador com ID ${colaboradorId} não encontrado`);
    }
  }

  // Formatação das datas
  const formattedDataInicio = formatDate(dataInicio);
  const formattedDataTermino = formatDate(dataTermino);

  const [affectedRows, updatedOrdens] = await OrdemServico.update(
    {
      numOS,
      cliente,
      descricao,
      colaboradorIds: JSON.stringify(colaboradorIds),
      dataInicio: formattedDataInicio,
      dataTermino: formattedDataTermino,
      horaInicio,
      horaTermino,
      status
    },
    { where: { id }, returning: true }
  );

  if (affectedRows === 0) {
    throw new Error('Ordem de serviço não encontrada');
  }

  // Converte as datas de volta para strings legíveis
  const updatedOrdem = updatedOrdens[0];
  return {
    ...updatedOrdem.toJSON(),
    dataInicio: formatDate(updatedOrdem.dataInicio),
    dataTermino: formatDate(updatedOrdem.dataTermino),
  };
};

export const deleteOrdemServico = async (id: string) => {
  const result = await OrdemServico.destroy({ where: { id } });
  if (result === 0) {
    throw new Error('Ordem de serviço não encontrada');
  }
  return result;
};
