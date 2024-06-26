import { getIO } from "../../libs/socket";
import Message from "../../models/Message";
import Ticket from "../../models/Ticket";
import { Op } from "sequelize";

interface Request {
  messageId: string;
  targetTicketId: number;
}

const forwardMessageService = async ({
  messageId,
  targetTicketId
}: Request): Promise<Message> => {
  // Validação de entrada
  if (isNaN(targetTicketId)) {
    throw new Error("Invalid targetTicketId");
  }

  const message = await Message.findOne({
    where: { id: messageId }
  });

  if (!message) {
    throw new Error("Message not found");
  }

  const ticket = await Ticket.findByPk(targetTicketId);

  if (!ticket) {
    throw new Error("Target ticket not found");
  }

  const newMessageData = {
    ...message.toJSON(),
    ticketId: targetTicketId,
    id: undefined // Remover o ID para gerar um novo
  };

  const newMessage = await Message.create(newMessageData);

  const io = getIO();
  io.to(ticket.id.toString()).emit("message", {
    action: "create",
    message: newMessage
  });

  return newMessage;
};

export default forwardMessageService;
