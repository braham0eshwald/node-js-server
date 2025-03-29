import { getKnex } from "../../knex.js";
const knex = await getKnex();

class UserModel {
  async userByUserName(username) {
    return await knex("users").where("username", username).first();
  }
  async userByID(id) {
    return await knex("users").where("id", +id).first();
  }
  async getAllUsers() {
    return await knex("users").select("*");
  }
  async createUser(username, email, paswd) {
    return await knex("users")
      .insert({ username, email, paswd })
      .returning("*");
  }
  async ifExists(username, email) {
    const Nusername = await knex("users").where("username", username).first();
    const Nemail = await knex("users").where("email", email).first();
    if (Nusername || Nemail) {
      return true;
    }
    return false;
  }
}

export default UserModel;
