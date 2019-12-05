import * as UserLoader from '../graphql/modules/user/UserLoader';

export const createLoaders = () => ({
  UserLoader: UserLoader.getLoader(),
});

export const dataloadersMiddleware = async (ctx, next) => {
  ctx.dataloaders = createLoaders();
  await next();
};
