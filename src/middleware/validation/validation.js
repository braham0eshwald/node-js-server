import Joi from "joi";

export function validate(schema) {
  return async (ctx, next) => {
    try {
      await schema.validateAsync(ctx.request.body, { abortEarly: false });
      await next();
    } catch (err) {
      ctx.status = 400;
      ctx.body = { error: "Validation failed", details: err.details };
    }
  };
}
