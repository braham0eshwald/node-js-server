import Router from "koa-router";
import ChatController from "../controllers/chatController.js";
import { messageRouter } from "./messageRoutes.js";
import { validate } from "../middleware/validation/validation.js";
import { createChatSchema } from "../middleware/validation/validationSchemas.js";
import { verifySession } from "../middleware/autorization.js";

export const chatRouter = new Router();
const chatController = ChatController;

chatRouter.use(verifySession);
chatRouter.post(
  "/chats",
  validate(createChatSchema),
  chatController.CreateChat
);
chatRouter.delete("/chats/:chat_id", chatController.DeleteChat);
chatRouter.get("/chats/:chat_id/users", chatController.GetChatUsers);
chatRouter.delete(
  "/chats/:chat_id/user/:user_id",
  chatController.DeleteFromChat
);
chatRouter.post("/chats/:chat_id/user/:user_id", chatController.AddUserToChat);

chatRouter.get("/", chatController.GetUsersChats);
chatRouter.get("/:chat_id", chatController.GetChat);
chatRouter.use("/:chat_id/messages", messageRouter.routes());
