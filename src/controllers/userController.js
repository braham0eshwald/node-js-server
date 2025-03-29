import UserModel from "../models/userModel.js";

const userModel = new UserModel();

class UserController {
  async GetUser(ctx) {
    const { username } = ctx.query;
    if (username) {
      const res = await userModel.userByUserName(username);
      ctx.body = res || "not found";
      return;
    } else {
      ctx.body = await userModel.getAllUsers();
    }
  }
  async GetUserByID(ctx) {
    const { id } = ctx.params;
    if (id) {
      const res = await userModel.userByID(id);
      ctx.body = res || "not found";
      return;
    }
  }
  async CreateUser(ctx) {
    const { username, email, paswd } = ctx.request.body;
    if (!username || !email || !paswd) {
      ctx.body = { error: "не все поля заполнены" };
      return;
    }

    if (await userModel.ifExists(username, email)) {
      ctx.body = {
        error: "пользователь с таким именем или почтой уже существует",
      };
      return;
    }

    const res = await userModel.createUser(username, email, paswd);

    ctx.body = res;
  }
}

export default UserController;
