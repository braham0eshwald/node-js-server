import MessageModel from "../models/messageModel.js";

const messageModel = new MessageModel();

class MessageController {
  async SendMessage(ctx) {
    const { chat_id, id } = ctx.params;
    const { message } = ctx.request.body;
    try {
      const res = await messageModel.sendMessage(chat_id, id, message);
      ctx.status = 201;
      ctx.body = res;
    } catch (error) {
      ctx.status = 500;
      ctx.body = { message: "Error sending message", error };
    }
  }

  async GetMessages(ctx) {
    const { chat_id } = ctx.params;
    if (!chat_id) {
      ctx.status = 400;
      ctx.body = { message: "Chat ID is required" };
      return;
    }
    try {
      const res = await messageModel.getMessages(+chat_id);
      ctx.status = 200;
      ctx.body = res;
    } catch (error) {
      ctx.status = 500;
      ctx.body = { message: "Error fetching messages", error };
    }
  }

  async DeleteMessage(ctx) {
    const { message_id, id } = ctx.params;
    try {
      const res = await messageModel.deleteMessage(message_id, id);
      if (res === 0) {
        ctx.status = 404;
        ctx.body = {
          message:
            "Message not found or you do not have permission to delete it",
        };
        return;
      }
      ctx.status = 200;
      ctx.body = { message: "Message deleted successfully" };
    } catch (error) {
      ctx.status = 500;
      ctx.body = { message: "Error deleting message", error };
    }
  }

  async UpdateMessage(ctx) {
    const { message_id, id } = ctx.params;
    const { message } = ctx.request.body;
    try {
      const updatedMessage = await messageModel.changeMessage(
        message_id,
        id,
        message
      );
      if (!updatedMessage) {
        ctx.status = 404;
        ctx.body = {
          message:
            "Message not found or you do not have permission to update it",
        };
        return;
      }
      ctx.status = 200;
      ctx.body = updatedMessage;
    } catch (error) {
      ctx.status = 500;
      ctx.body = { message: "Error updating message", error };
    }
  }
}

export default new MessageController();
