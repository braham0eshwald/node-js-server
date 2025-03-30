import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";

const userModel = new UserModel();

class AuthController {
  async Register(ctx) {
    const { username, email, paswd } = ctx.request.body;

    const existingUser = await userModel.ifExists(username, email);
    if (existingUser) {
      ctx.status = 400;
      ctx.body = { error: "User already exists" };
      return;
    }
    const newUser = await userModel.createUser(username, email, paswd);
    ctx.body = { message: "User registered!", user: newUser };
  }

  async Login(ctx) {
    const { email, paswd } = ctx.request.body;
    const user = await userModel.userByEmail(email);
    if (!user) {
      ctx.status = 401;
      ctx.body = { error: "Invalid username or password" };
      return;
    }

    const comparePasswords = await bcrypt.compare(paswd, user.paswd);
    if (!comparePasswords) {
      ctx.status = 401;
      ctx.body = { error: "password is incorrect" };
      return;
    }

    ctx.session.user = { id: user.id, username: user.username };
    ctx.body = { message: "Login successful!", user: ctx.session.user };
  }

  async Profile(ctx) {
    if (!ctx.session.user) {
      ctx.status = 401;
      ctx.body = { error: "Unauthorized" };
      return;
    }

    ctx.body = { message: "Welcome!", user: ctx.session.user };
  }

  async Logout(ctx) {
    ctx.session = null;
    ctx.body = { message: "Logged out successfully" };
  }
}

export default AuthController;
