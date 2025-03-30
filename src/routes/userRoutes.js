import Router from "koa-router";
import UserController from "../controllers/userController.js";
import { chatRouter } from "./chatRoutes.js";
import { verifySession } from "../middleware/autorization.js";

const userController = UserController;

export const userRouter = new Router();

chatRouter.use(verifySession);

userRouter.get("/users", userController.getUser);
userRouter.get("/users/:id", userController.getUserByID);
userRouter.use("/users/:id/chats", chatRouter.routes());
