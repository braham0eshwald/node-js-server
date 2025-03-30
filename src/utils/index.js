import Koa from "koa";
import { userRouter } from "../routes/userRoutes.js";
import { messageRouter } from "../routes/messageRoutes.js";
import { chatRouter } from "../routes/chatRoutes.js";
import bodyParser from "koa-bodyparser";
import session from "koa-session";
import { sessionConf, SESSION_SECRET } from "./config.js";
import { authRouter } from "../routes/authRoutes.js";

async function main() {
  const app = new Koa();

  app.use(bodyParser());
  app.keys = [SESSION_SECRET];
  app.use(session(sessionConf, app));

  app.listen(3033, () => {
    console.log("server started");
  });
  app.use(authRouter.routes());
  app.use(userRouter.routes());
  app.use(chatRouter.routes());
  app.use(messageRouter.routes());
}

main().catch((er) => {
  console.log("error" + er);
});
