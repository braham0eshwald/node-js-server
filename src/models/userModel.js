import { getKnex } from "../../knex.js";
import bcrypt from "bcryptjs";

class UserModel {
  async userByUserName(username) {
    const knex = await getKnex();
    return await knex("users").where("username", username).first();
  }

  async userByEmail(email) {
    const knex = await getKnex();
    return await knex("users").where("email", email).first();
  }

  async userByID(id) {
    const knex = await getKnex();
    return await knex("users").where("id", id).first();
  }

  async getAllUsers() {
    const knex = await getKnex();
    return await knex("users").select("*");
  }

  async createUser(username, email, password) {
    const knex = await getKnex();
    const hashedPassword = await bcrypt.hash(password, 10);
    const [user] = await knex("users")
      .insert({ username, email, paswd: hashedPassword })
      .returning("*");
    return user;
  }

  async ifExists(username, email) {
    const knex = await getKnex();
    return await knex("users")
      .where("username", username)
      .orWhere("email", email)
      .first();
  }
}

export default UserModel;
