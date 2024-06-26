import { Router } from 'express';
import {
  addOrdemServico,
  listOrdensServico,
  getOrdemServicoById,
  updateOrdemServicoById,
  deleteOrdemServicoById,
} from '../controllers/OrdemServicoController';

const router = Router();

// Middleware opcional para validar que colaboradorIds é um array
const validateColaboradorIds = (req, res, next) => {
  if (!Array.isArray(req.body.colaboradorIds)) {
    return res.status(400).json({ error: 'colaboradorIds deve ser um array' });
  }
  next();
};

// Rotas CRUD para Ordens de Serviço
router.post('/ordemservicos', validateColaboradorIds, addOrdemServico);
router.get('/ordemservicos', listOrdensServico);
router.get('/ordemservicos/:id', getOrdemServicoById);
router.put('/ordemservicos/:id', validateColaboradorIds, updateOrdemServicoById);
router.delete('/ordemservicos/:id', deleteOrdemServicoById);

export default router;
