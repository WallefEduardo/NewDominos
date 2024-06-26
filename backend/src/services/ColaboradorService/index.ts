import Colaborador from "../../models/Colaborador"; // Atualize para Colaborador

export const createColaborador = async (data: any) => {
  return await Colaborador.create(data);
};

export const getAllColaboradores = async () => {
  return await Colaborador.findAll();
};

export const getColaboradorById = async (id: string) => {
  return await Colaborador.findByPk(id);
};

export const updateColaborador = async (id: string, data: any) => {
  return await Colaborador.update(data, { where: { id } });
};

export const deleteColaborador = async (id: string) => {
  return await Colaborador.destroy({ where: { id } });
};
