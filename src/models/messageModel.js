import { getKnex } from "../../knex.js";

class MessageModel {
  async sendMessage(chat_id, user_id, content) {
    const knex = await getKnex();
    const [message] = await knex("messages")
      .insert({ chat_id, user_id, content })
      .returning("*");
    return message;
  }

  async getMessages(chat_id, limit = 100, offset = 0) {
    const knex = await getKnex();
    return await knex("messages")
      .where("chat_id", chat_id)
      .orderBy("created_at", "desc")
      .limit(limit)
      .offset(offset);
  }

  async deleteMessage(id, user_id) {
    const knex = await getKnex();
    const rowsDeleted = await knex("messages").where({ id, user_id }).del();
    return rowsDeleted;
  }

  async changeMessage(id, user_id, content) {
    const knex = await getKnex();
    const [updatedMessage] = await knex("messages")
      .where({ id, user_id })
      .update({ content })
      .returning("*");
    return updatedMessage;
  }
}

export default MessageModel;
