export const addSession = user => {
  return (ctx, next) => {
    ctx.user = user();
    next();
  };
};
