import mockedUsers from '../modules/user/mockedUsers'

export const loggedUserMiddleware = async (ctx, next) => {
  if (!ctx.request.headers || ctx.request.headers.authorization) {
    ctx.user = null;
    return next();
  }
  /** Check your logged user here **/
  ctx.user = mockedUsers[0]
  next();
};
