export const addData = callback => {
  return async (ctx, next) => {
      const data = await callback(ctx.params.id);
      data.isOwner = data._ownerId == ctx.user?._id;
      data.isLogged = Boolean(ctx.user);
      ctx.data = Object.assign({}, data);
    next();
  };
};
