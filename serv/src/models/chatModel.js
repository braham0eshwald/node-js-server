import { getKnex } from "../../knex.js";

class ChatModel {
  async createChat(chat_name) {
    const knex = await getKnex();
    const [chat] = await knex("chats").insert({ chat_name }).returning("*");
    return chat;
  }

  async addUser(chat_id, user_id) {
    const knex = await getKnex();
    const [chatUser] = await knex("chats_users")
      .insert({ user_id, chat_id })
      .returning("*");
    return chatUser;
  }

  async ifChatExists(chat_name) {
    const knex = await getKnex();
    return knex("chats").where("chat_name", chat_name).first();
  }

  async getChatById(id) {
    const knex = await getKnex();
    return knex("chats").where("id", id).first();
  }

  async getChatUsers(id) {
    const knex = await getKnex();
    return knex("chats_users")
      .join("users", "chats_users.user_id", "=", "users.id")
      .where("chats_users.chat_id", id)
      .select("users.username", "users.email", "users.id");
  }

  async deleteFromChat(chat_id, user_id) {
    const knex = await getKnex();
    const rowsDeleted = await knex("chats_users")
      .where("chat_id", chat_id)
      .andWhere("user_id", user_id)
      .del();
    return rowsDeleted;
  }

  async usersChats(user_id) {
    const knex = await getKnex();
    return knex("chats_users")
      .join("chats", "chats_users.chat_id", "=", "chats.id")
      .where("chats_users.user_id", user_id)
      .select("chats.id", "chats.chat_name");
  }

  async deleteChat(id) {
    const knex = await getKnex();
    const rowsDeleted = await knex("chats").where("id", id).del();
    return rowsDeleted;
  }
}

export default ChatModel;
