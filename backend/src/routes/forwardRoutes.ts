// backend/src/routes/forwardRoutes.ts

import { Router } from "express";
import isAuth from "../middleware/isAuth"; // Middleware de autenticação
import { forward } from "../controllers/ForwardMessageController";

const forwardRoutes = Router();

forwardRoutes.post("/forward", isAuth, forward);

export default forwardRoutes;