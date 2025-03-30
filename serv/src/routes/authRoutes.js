import Router from "koa-router";
import AuthController from "../controllers/authController.js";
import { validate } from "../middleware/validation/validation.js";
import {
  registerSchema,
  loginSchema,
} from "../middleware/validation/validationSchemas.js";
import { verifySession } from "../middleware/autorization.js";

const authController = new AuthController();
export const authRouter = new Router();

authRouter.post("/register", validate(registerSchema), authController.Register);
authRouter.post("/login", validate(loginSchema), authController.Login);
authRouter.get("/profile", verifySession, authController.Profile);
authRouter.post("/logout", authController.Logout);
