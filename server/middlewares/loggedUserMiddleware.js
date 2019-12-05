import mockedUsers from '../graphql/modules/user/mockedUsers'

export const loggedUserMiddleware = async (ctx, next) => {
  /** Check your logged user here **/
  ctx.user = mockedUsers[0]
  await next();
};
