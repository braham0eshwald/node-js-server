import { getKnex } from "../../knex.js";
const knex = await getKnex();

class ChatModel {
  async createChat(chat_name) {
    return await knex("chats").insert({ chat_name }).returning("*");
  }
  async addUser(chat_id, user_id) {
    return await knex("chats_users").insert({ user_id, chat_id });
  }
  async ifChatExists(chat_name) {
    const res = await knex("chats").where("chat_name", chat_name).first();
    return res ? true : false;
  }
  async getChatById(id) {
    return await knex("chats").where("id", id).returning("*");
  }
  async getChatUsers(id) {
    return await knex("chats_users").where("chat_id", id).returning("*");
  }
  async deleteFromChat(chat_id, user_id) {
    return await knex("chats_users")
      .where("chat_id", chat_id)
      .andWhere("user_id", user_id)
      .del();
  }
  async usersChats(id) {
    return await knex("chats_users").where("user_id", +id).returning("*");
  }
  async deleteChat(id) {
    return await knex("chats").where("id", id).del();
  }
}

export default ChatModel;
