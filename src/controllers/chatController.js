import ChatModel from "../models/chatModel.js";
const chatModel = new ChatModel();

class ChatController {
  async CreateChat(ctx) {
    try {
      const { chat_name, users } = ctx.request.body;

      if (await chatModel.ifChatExists(chat_name)) {
        ctx.status = 424;
        ctx.body = { message: "Chat already exists" };
        return;
      }

      const res = await chatModel.createChat(chat_name);
      const { id } = res;

      for (const user_id of users) {
        await chatModel.addUser(+id, +user_id);
      }

      ctx.status = 201;
      ctx.body = { message: "Successfully created", chat_id: id };
    } catch (error) {
      ctx.status = 500;
      ctx.body = { message: "Internal Server Error", error: error.message };
    }
  }

  async AddUserToChat(ctx) {
    try {
      const { chat_id, user_id } = ctx.params;
      if (!chat_id && !user_id) {
        ctx.status = 400;
        ctx.body = { message: "Chat id and User id expected" };
        return;
      }
      const chatusers = await chatModel.getChatUsers(chat_id);
      if (
        (await !chatModel.ifChatExists(chat_id)) ||
        chatusers.some((item) => +item["id"] === +user_id)
      ) {
        ctx.status = 400;
        ctx.body = {
          message: "Chat doesn't exist or it already contains user",
        };
        return;
      }

      const res = await chatModel.addUser(chat_id, user_id);
      if (res) {
        ctx.status = 201;
        ctx.body = { message: "User succesfully added to chat" };
      }
    } catch (error) {
      ctx.status = 500;
      ctx.body = { message: "Internal Server Error", error: error.message };
    }
  }

  async GetChat(ctx) {
    try {
      const { chat_id } = ctx.params;

      if (!chat_id) {
        ctx.status = 400;
        ctx.body = { message: "Chat id expected" };
        return;
      }

      const res = await chatModel.getChatById(+chat_id);
      if (!res) {
        ctx.status = 404;
        ctx.body = { message: "Chat not found" };
        return;
      }

      ctx.status = 200;
      ctx.body = res;
    } catch (error) {
      ctx.status = 500;
      ctx.body = { message: "Internal Server Error", error: error.message };
    }
  }

  async GetChatUsers(ctx) {
    try {
      const { chat_id } = ctx.params;

      if (!chat_id) {
        ctx.status = 400;
        ctx.body = { message: "Chat id expected" };
        return;
      }

      const res = await chatModel.getChatUsers(+chat_id);
      if (res.length === 0) {
        ctx.status = 404;
        ctx.body = { message: "No users found" };
        return;
      }

      ctx.status = 200;
      ctx.body = res;
    } catch (error) {
      ctx.status = 500;
      ctx.body = { message: "Internal Server Error", error: error.message };
    }
  }

  async DeleteFromChat(ctx) {
    try {
      const { chat_id, user_id } = ctx.params;

      if (!chat_id || !user_id) {
        ctx.status = 400;
        ctx.body = { message: "Both chat_id and user_id are required" };
        return;
      }

      const res = await chatModel.deleteFromChat(+chat_id, +user_id);
      if (res === 0) {
        ctx.status = 400;
        ctx.body = { message: "Couldn't delete user from chat" };
        return;
      }

      ctx.status = 200;
      ctx.body = { message: "User deleted from chat" };
    } catch (error) {
      ctx.status = 500;
      ctx.body = { message: "Internal Server Error", error: error.message };
    }
  }

  async DeleteChat(ctx) {
    try {
      const { chat_id } = ctx.params;

      if (!chat_id) {
        ctx.status = 400;
        ctx.body = { message: "Chat id required" };
        return;
      }

      const res = await chatModel.deleteChat(+chat_id);
      if (res === 0) {
        ctx.status = 400;
        ctx.body = { message: "Couldn't delete chat" };
        return;
      }

      ctx.status = 200;
      ctx.body = { message: "Chat deleted" };
    } catch (error) {
      ctx.status = 500;
      ctx.body = { message: "Internal Server Error", error: error.message };
    }
  }

  async GetUsersChats(ctx) {
    try {
      const { id } = ctx.params;

      if (!id) {
        ctx.status = 400;
        ctx.body = { message: "User id required" };
        return;
      }

      const res = await chatModel.usersChats(+id);
      if (!res.length) {
        ctx.status = 404;
        ctx.body = { message: "No chats found for this user" };
        return;
      }

      ctx.status = 200;
      ctx.body = res;
    } catch (error) {
      ctx.status = 500;
      ctx.body = { message: "Internal Server Error", error: error.message };
    }
  }
}

export default new ChatController();
