import UserModel from "../models/userModel.js";

const userModel = new UserModel();

class UserController {
  async getUser(ctx) {
    try {
      const { username } = ctx.query;
      if (username) {
        const user = await userModel.userByUserName(username);
        if (user) {
          ctx.status = 200;
          ctx.body = user;
        } else {
          ctx.status = 404;
          ctx.body = { message: "User not found" };
        }
        return;
      }
      ctx.body = await userModel.getAllUsers();
    } catch (error) {
      ctx.status = 500;
      ctx.body = { message: "Internal Server Error", error: error.message };
    }
  }

  async getUserByID(ctx) {
    try {
      const { id } = ctx.params;
      if (id) {
        const user = await userModel.userByID(id);
        if (user) {
          ctx.status = 200;
          ctx.body = user;
        } else {
          ctx.status = 404;
          ctx.body = { message: "User not found" };
        }
      }
    } catch (error) {
      ctx.status = 500;
      ctx.body = { message: "Internal Server Error", error: error.message };
    }
  }

  async createUser(ctx) {
    try {
      const { username, email, password } = ctx.request.body;

      const exists = await userModel.ifExists(username, email);
      if (exists) {
        ctx.status = 409;
        ctx.body = { message: "User already exists" };
        return;
      }

      const newUser = await userModel.createUser(username, email, password);
      ctx.status = 201;
      ctx.body = newUser;
    } catch (error) {
      ctx.status = 400;
      ctx.body = { message: error.message };
    }
  }
}

export default new UserController();
