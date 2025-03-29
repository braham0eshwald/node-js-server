import MessageModel from "../models/messageModel.js";

const messageModel = new MessageModel();

class MessageController {
  async SendMessage(ctx) {
    const { chat_id, user_id, message } = ctx.request.body;
    if (!chat_id || !user_id || !message || message.length === 0) {
      ctx.body = "не все поля заполнены";
      return;
    }

    const res = await messageModel.sendMessage(chat_id, user_id, message);
    ctx.body = res;
  }
  async GetMessages(ctx) {
    const { chat_id } = ctx.params;
    if (!chat_id) {
      ctx.body = "not found";
      return;
    }

    const res = await messageModel.getMessages(+chat_id);
    ctx.body = res;
  }
  async DeleteMessage(ctx) {
    const { id, user_id } = ctx.request.body;
    if (!id || !user_id) {
      ctx.body = "not found";
      return;
    }
    const res = await messageModel.deleteMessage(id, user_id);
    ctx.body = res;
  }
  async UpdateMessage(ctx) {
    const { id, user_id, content } = ctx.request.body;
    if (!id || !user_id || !content || content.length === 0) {
      ctx.body = "not found";
      return;
    }

    const res = await messageModel.changeMessage(id, user_id, content);
    ctx.body = res;
  }
}

export default MessageController;
