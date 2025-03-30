export function verifySession(ctx, next) {
  const { id } = ctx.params;
  if (!ctx.session || !ctx.session.user) {
    ctx.status = 401;
    ctx.body = { message: "Unauthorized" };
    if (!id) return;
  } else if (ctx.session.user.id !== +id) {
    ctx.status = 401;
    ctx.body = { message: "Unauthorized" };
    return;
  }
  return next();
}
