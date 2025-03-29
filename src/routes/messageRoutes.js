import Router from "koa-router";
import MessageController from "../controllers/messageController.js";

export const messageRouter = new Router();
const messageController = new MessageController();

messageRouter.post("/", messageController.SendMessage);
messageRouter.get("/", messageController.GetMessages);
messageRouter.delete("/", messageController.DeleteMessage);
messageRouter.put("/", messageController.UpdateMessage);
