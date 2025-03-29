import dotenv from "dotenv";

dotenv.config();

const { PG_URI, HTTP_PORT } = process.env;

export { PG_URI, HTTP_PORT };
