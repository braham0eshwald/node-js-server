import dotenv from "dotenv";

dotenv.config();

const { PG_URI, HTTP_PORT, SESSION_SECRET } = process.env;

const sessionConf = {
  key: "koa:sess",
  maxAge: 24 * 60 * 60 * 1000, // 1 день
  httpOnly: true,
  secure: false,
};

export { PG_URI, HTTP_PORT, sessionConf, SESSION_SECRET };
