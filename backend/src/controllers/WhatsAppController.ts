import { Request, Response } from "express";
import { getIO } from "../libs/socket";
import { removeWbot, restartWbot } from "../libs/wbot";
import { StartWhatsAppSession } from "../services/WbotServices/StartWhatsAppSession";
import AppError from "../errors/AppError";

import CreateWhatsAppService from "../services/WhatsappService/CreateWhatsAppService";
import DeleteWhatsAppService from "../services/WhatsappService/DeleteWhatsAppService";
import ListWhatsAppsService from "../services/WhatsappService/ListWhatsAppsService";
import ShowWhatsAppService from "../services/WhatsappService/ShowWhatsAppService";
import UpdateWhatsAppService from "../services/WhatsappService/UpdateWhatsAppService";

interface WhatsappData {
  name: string;
  queueIds: number[];
  companyId: number;
  greetingMessage?: string;
  complationMessage?: string;
  outOfHoursMessage?: string;
  ratingMessage?: string;
  closeMessage?: string;
  status?: string;
  isDefault?: boolean;
  token?: string;
  webhook?: string;
  ignoreNumbers?: string;
  selectedMoveQueueId?: number;
  selectedInterval?: number;
  inatividade?: number;
}

interface QueryParams {
  session?: number | string;
}

export const index = async (req: Request, res: Response): Promise<Response> => {
  const { companyId } = req.user;
  const { session } = req.query as QueryParams;
  const whatsapps = await ListWhatsAppsService({ companyId, session });

  return res.status(200).json(whatsapps);
};

export const store = async (req: Request, res: Response): Promise<Response> => {
  const {
    name,
    status,
    isDefault,
    greetingMessage,
    complationMessage,
    outOfHoursMessage,
    closeMessage,
    queueIds,
    token,
    webhook,
    ignoreNumbers,
    selectedMoveQueueId,
    selectedInterval,
    inatividade
  }: WhatsappData = req.body;
  const { companyId } = req.user;

  const { whatsapp, oldDefaultWhatsapp } = await CreateWhatsAppService({
    name,
    status,
    isDefault,
    greetingMessage,
    complationMessage,
    outOfHoursMessage,
    closeMessage,
    queueIds,
    companyId,
    token,
    webhook,
    ignoreNumbers,
    selectedMoveQueueId,
  	selectedInterval,
    inatividade
  });

  StartWhatsAppSession(whatsapp, companyId);

  const io = getIO();
 io.emit(`company-${companyId}-whatsapp`, {
    action: "update",
    whatsapp
  });

  if (oldDefaultWhatsapp) {
   io.emit(`company-${companyId}-whatsapp`, {
      action: "update",
      whatsapp: oldDefaultWhatsapp
    });
  }

  return res.status(200).json(whatsapp);
};

export const show = async (req: Request, res: Response): Promise<Response> => {
  const { whatsappId } = req.params;
  const { companyId } = req.user;
  const { session } = req.query;

  const whatsapp = await ShowWhatsAppService(whatsappId, companyId, session);

  return res.status(200).json(whatsapp);
};

export const update = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { whatsappId } = req.params;
  const whatsappData = req.body;
  const { companyId } = req.user;

  const { whatsapp, oldDefaultWhatsapp } = await UpdateWhatsAppService({
    whatsappData,
    whatsappId,
    companyId
  });

  const io = getIO();
 io.emit(`company-${companyId}-whatsapp`, {
    action: "update",
    whatsapp
  });

  if (oldDefaultWhatsapp) {
   io.emit(`company-${companyId}-whatsapp`, {
      action: "update",
      whatsapp: oldDefaultWhatsapp
    });
  }

  return res.status(200).json(whatsapp);
};

export const remove = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { whatsappId } = req.params;
  const { companyId } = req.user;

  await ShowWhatsAppService(whatsappId, companyId);

  await DeleteWhatsAppService(whatsappId);
  removeWbot(+whatsappId);

  const io = getIO();
 io.emit(`company-${companyId}-whatsapp`, {
    action: "delete",
    whatsappId: +whatsappId
  });

  return res.status(200).json({ message: "Whatsapp deleted." });
};

export const restart = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { companyId, profile } = req.user;

  if (profile !== "admin") {
    throw new AppError("ERR_NO_PERMISSION", 403);
  }

  await restartWbot(companyId);

  return res.status(200).json({ message: "Whatsapp restart." });
};