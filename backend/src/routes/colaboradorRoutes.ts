// backend/src/routes/colaboradorRoutes.ts

import { Router } from "express";
import { upload } from "../controllers/ColaboradorController"; // Importar o middleware de upload
import {
  addColaborador,
  listColaboradores,
  getColaborador,
  updateColaboradorById,
  deleteColaboradorById,
} from "../controllers/ColaboradorController";

const colaboradorRoutes = Router();

// Adiciona o middleware de upload antes das funções de manipulação
colaboradorRoutes.post("/colaboradores", upload.single('foto'), addColaborador);
colaboradorRoutes.get("/colaboradores", listColaboradores);
colaboradorRoutes.get("/colaboradores/:id", getColaborador);
colaboradorRoutes.put("/colaboradores/:id", upload.single('foto'), updateColaboradorById);
colaboradorRoutes.delete("/colaboradores/:id", deleteColaboradorById);

export default colaboradorRoutes;
