import Koa from "koa";
import { userRouter } from "../routes/userRoutes.js";
import { messageRouter } from "../routes/messageRoutes.js";
import { chatRouter } from "../routes/chatRoutes.js";
import bodyParser from "koa-bodyparser";

async function main() {
  const app = new Koa();

  app.use(bodyParser());

  app.listen(3033, () => {
    console.log("server started");
  });
  app.use(userRouter.routes());
  app.use(chatRouter.routes());
  app.use(messageRouter.routes());

  app.use(async (ctx) => {
    ctx.body = "hello world!";
  });
}

main().catch((er) => {
  console.log("error" + er);
});
