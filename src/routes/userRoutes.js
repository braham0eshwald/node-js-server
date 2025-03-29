import Router from "koa-router";
import UserController from "../controllers/userController.js";
import { chatRouter } from "./chatRoutes.js";

const userController = new UserController();

export const userRouter = new Router();

userRouter.get("/users", userController.GetUser);
userRouter.get("/users/:id", userController.GetUserByID);
userRouter.post("/users", userController.CreateUser);
userRouter.use("/users/:id/chats", chatRouter.routes());
