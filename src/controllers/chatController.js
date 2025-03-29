import ChatModel from "../models/chatModel.js";

const chatModel = new ChatModel();

class ChatController {
  async CreateChat(ctx) {
    const { chat_name, users } = ctx.request.body;
    if (!chat_name || !users || !Array.isArray(users) || users.length === 0) {
      ctx.body = "не все поля заполнены";
      return;
    }
    if (await chatModel.ifChatExists(chat_name)) {
      ctx.body = "чат уже существует";
      return;
    }
    const res = await chatModel.createChat(chat_name);
    const { id } = res[0];
    for (const user_id of users) {
      await chatModel.addUser(+id, +user_id);
    }
    ctx.body = "created";
  }
  async GetChat(ctx) {
    const { chat_id } = ctx.params;
    if (!chat_id) {
      ctx.body = "not found";
      return;
    }
    const res = await chatModel.getChatById(+chat_id);
    ctx.body = res.length === 0 ? "not found" : res;
  }
  async GetChatUsers(ctx) {
    const { chat_id } = ctx.params;
    if (!chat_id) {
      ctx.body = "not found";
      return;
    }
    const res = await chatModel.getChatUsers(+chat_id);
    ctx.body = res.length === 0 ? "not found" : res;
  }
  async DeleteFromChat(ctx) {
    const { chat_id, id } = ctx.params;

    if (!chat_id || !id) {
      ctx.body = "не все поля заполненв";
      return;
    }

    const res = await chatModel.deleteFromChat(+chat_id, +id);
    ctx.body = res.length === 0 ? "not found" : res;
  }
  async DeleteChat(ctx) {
    const { chat_id } = ctx.params;

    if (!chat_id) {
      ctx.body = "not found";
      return;
    }

    const res = await chatModel.deleteChat(+chat_id);
    ctx.body = res;
  }
  async GetUsersChats(ctx) {
    const { id } = ctx.params;
    if (!id) {
      ctx.body = "пользователь не найден";
      return;
    }
    const res = await chatModel.usersChats(+id);
    ctx.body = res ? res : "not found";
  }
}

export default ChatController;
