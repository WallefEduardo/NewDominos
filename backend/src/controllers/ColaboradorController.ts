// backend/src/controllers/ColaboradorController.ts

import { Request, Response } from "express";
import multer from "multer";
import {
  createColaborador,
  getAllColaboradores,
  getColaboradorById,
  updateColaborador,
  deleteColaborador,
} from "../services/ColaboradorService";

// Configuração do multer para upload de arquivos
const upload = multer({ dest: 'uploads/' }); // Configuração básica para armazenamento de arquivos

export const addColaborador = async (req: Request, res: Response) => {
  try {
    const { nome, genero, funcao, setor } = req.body;
    const foto = req.file ? req.file.filename : null; // Verifique se o arquivo foi enviado

    const colaborador = await createColaborador({ nome, genero, funcao, setor, foto });
    return res.status(201).json(colaborador);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Função para listar todos os colaboradores
export const listColaboradores = async (req: Request, res: Response) => {
  try {
    const colaboradores = await getAllColaboradores();
    return res.status(200).json(colaboradores);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Função para obter um colaborador pelo ID
export const getColaborador = async (req: Request, res: Response) => {
  try {
    const colaborador = await getColaboradorById(req.params.id);
    if (colaborador) {
      return res.status(200).json(colaborador);
    }
    return res.status(404).json({ message: "Colaborador not found" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Função para atualizar um colaborador pelo ID
export const updateColaboradorById = async (req: Request, res: Response) => {
  try {
    const { nome, genero, funcao, setor } = req.body;
    const foto = req.file ? req.file.filename : null; // Verifique se o arquivo foi enviado

    const colaborador = await updateColaborador(req.params.id, { nome, genero, funcao, setor, foto });
    if (colaborador) {
      return res.status(200).json(colaborador);
    }
    return res.status(404).json({ message: "Colaborador not found" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Função para deletar um colaborador pelo ID
export const deleteColaboradorById = async (req: Request, res: Response) => {
  try {
    const colaborador = await deleteColaborador(req.params.id);
    if (colaborador) {
      return res.status(200).json({ message: "Colaborador deleted" });
    }
    return res.status(404).json({ message: "Colaborador not found" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Exportar o upload para ser usado nas rotas
export { upload };
