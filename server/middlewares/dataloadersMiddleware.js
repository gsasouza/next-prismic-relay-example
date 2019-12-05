import * as UserLoader from '../modules/user/UserLoader';

export const createLoaders = () => ({
  UserLoader: UserLoader.getLoader(),
});

export const dataloadersMiddleware = (ctx, next) => {
  ctx.dataloaders = createLoaders();
  next();
};
