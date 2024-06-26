import express from 'express';
import isAuth from '../middleware/isAuth';
import * as OrigemController from '../controllers/OrigemController';
import * as MotivoController from '../controllers/MotivoController';
import * as ClassificacaoController from '../controllers/ClassificacaoController';
import * as DeclinioReportController from '../controllers/DeclinioReportController';
import * as DeclinioController from '../controllers/DeclinioController'; // Importar o controller de declínio

const declinioRoutes = express.Router();

// Rotas para Origem
declinioRoutes.get('/origens', isAuth, OrigemController.getAllOrigens);
declinioRoutes.post('/origens', isAuth, OrigemController.createOrigem);
declinioRoutes.get('/origens/:id', isAuth, OrigemController.getOrigemById);
declinioRoutes.put('/origens/:id', isAuth, OrigemController.updateOrigem);
declinioRoutes.delete('/origens/:id', isAuth, OrigemController.deleteOrigem);

// Rotas para Motivo
declinioRoutes.get('/motivos', isAuth, MotivoController.getAllMotivos);
declinioRoutes.post('/motivos', isAuth, MotivoController.createMotivo);
declinioRoutes.get('/motivos/:id', isAuth, MotivoController.getMotivoById);
declinioRoutes.put('/motivos/:id', isAuth, MotivoController.updateMotivo);
declinioRoutes.delete('/motivos/:id', isAuth, MotivoController.deleteMotivo);

// Rotas para Classificacao
declinioRoutes.get('/classificacoes', isAuth, ClassificacaoController.getAllClassificacoes);
declinioRoutes.post('/classificacoes', isAuth, ClassificacaoController.createClassificacao);
declinioRoutes.get('/classificacoes/:id', isAuth, ClassificacaoController.getClassificacaoById);
declinioRoutes.put('/classificacoes/:id', isAuth, ClassificacaoController.updateClassificacao);
declinioRoutes.delete('/classificacoes/:id', isAuth, ClassificacaoController.deleteClassificacao);

// Rota para acessar os dados do relatório de declínio
declinioRoutes.get('/report', isAuth, DeclinioReportController.getAggregatedDeclinioData);

// Rotas para Declínio
declinioRoutes.post('/declinios', isAuth, DeclinioController.createDeclinio);
declinioRoutes.get('/declinios', isAuth, DeclinioController.getAllDeclinios);

export default declinioRoutes;
