import Router from "koa-router";
import MessageController from "../controllers/messageController.js";
import { validate } from "../middleware/validation/validation.js";
import {
  sendMessageSchema,
  changeMessageSchema,
} from "../middleware/validation/validationSchemas.js";
import { verifySession } from "../middleware/autorization.js";

export const messageRouter = new Router();
const messageController = MessageController;

messageRouter.use(verifySession);

messageRouter.post(
  "/",
  validate(sendMessageSchema),
  messageController.SendMessage
);
messageRouter.get("/", messageController.GetMessages);
messageRouter.delete("/:message_id", messageController.DeleteMessage);
messageRouter.put(
  "/:message_id",
  validate(changeMessageSchema),
  messageController.UpdateMessage
);
