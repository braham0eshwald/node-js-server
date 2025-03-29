import { getKnex } from "../../knex.js";

const knex = await getKnex();

class MessageModel {
  async sendMessage(chat_id, user_id, content) {
    return await knex("messages")
      .insert({ chat_id, user_id, content })
      .returning("*");
  }
  async getMessages(chat_id) {
    return await knex("messages")
      .where("chat_id", chat_id)
      .orderBy("created_at", "desc")
      .limit(100);
  }
  async deleteMessage(id, user_id) {
    return await knex("messages").where({ id, user_id }).del();
  }
  async changeMessage(id, user_id, content) {
    return await knex("messages").where({ id, user_id }).update({ content });
  }
}

export default MessageModel;
