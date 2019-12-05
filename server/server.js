import Koa from 'koa';
import KoaRouter from 'koa-router';
import next from 'next';
import koaBody from 'koa-bodyparser';
import koaPlayground from 'graphql-playground-middleware-koa';
import cookie from 'koa-cookie';
import { ApolloServer } from 'apollo-server-koa';

import { PORT, isDev } from '../lib/config';
import { getSchema } from './graphql/schema/schema';
import { dataloadersMiddleware, loggedUserMiddleware, prismicPreviewMiddleware } from './middlewares'

const app = next({ dev: isDev });
const handler = app.getRequestHandler();

app.prepare().then(async () => {
  const server = new Koa();
  const router = new KoaRouter();
  server.use(cookie());
  server.use(koaBody());
  server.use(dataloadersMiddleware);
  server.use(loggedUserMiddleware);

  router.get('/preview', prismicPreviewMiddleware)

  const schema = await getSchema()
  const graphql = new ApolloServer({
    schema,
    context: ({ ctx }) => {
      return ctx;
    }
  });
  graphql.applyMiddleware({ app: server });

  router.get('*', async ctx => {
    ctx.respond = false;
    await handler(ctx.req, ctx.res);
  });

  server.use(router.routes()).use(router.allowedMethods());
  server.listen(PORT);
});
