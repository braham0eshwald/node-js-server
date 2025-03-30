import Joi from "joi";

export const registerSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  paswd: Joi.string().min(6).max(50).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().min(7).required(),
  paswd: Joi.string().min(8).required(),
});

export const createChatSchema = Joi.object({
  chat_name: Joi.string().required(),
  users: Joi.array().min(1).required(),
});

export const sendMessageSchema = Joi.object({
  message: Joi.string().min(1).required(),
});

export const changeMessageSchema = Joi.object({
  message: Joi.string().min(1).required(),
});
