import Router from "koa-router";
import ChatController from "../controllers/chatController.js";
import { messageRouter } from "./messageRoutes.js";

export const chatRouter = new Router();
const chatController = new ChatController();

// операция с чатом исключающие влияние пользователя
chatRouter.post("/chats", chatController.CreateChat);
chatRouter.delete("/chats/:chat_id", chatController.DeleteChat);
chatRouter.get("/chats/:chat_id/users", chatController.GetChatUsers);
chatRouter.delete(
  "/chats/:chat_id/user/:user_id",
  chatController.DeleteFromChat
);

chatRouter.get("/", chatController.GetUsersChats);
chatRouter.get("/:chat_id", chatController.GetChat);
chatRouter.use("/:chat_id/messages", messageRouter.routes());
