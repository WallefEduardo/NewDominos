// backend/src/controllers/ForwardMessageController.ts

import { Request, Response } from "express";
import forwardMessageService from "../services/MessageServices/ForwardMessageService";

export const forward = async (req: Request, res: Response): Promise<Response> => {
  const { originalMessageId, targetTicketId } = req.body;

  try {
    // Validar os parâmetros recebidos
    if (!originalMessageId || !targetTicketId) {
      throw new Error("Missing required parameters: originalMessageId or targetTicketId");
    }

    // Chamar o serviço para encaminhar a mensagem
    const forwardedMessage = await forwardMessageService({
      messageId: originalMessageId,
      targetTicketId
    });

    // Retornar a resposta com sucesso
    return res.status(200).json({
      message: "Mensagem encaminhada com sucesso.",
      forwardedMessage
    });
  } catch (error) {
    console.error("Erro ao encaminhar mensagem:", error);
    return res.status(400).json({ error: error.message });
  }
};
