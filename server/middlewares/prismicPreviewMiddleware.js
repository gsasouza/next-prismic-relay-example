import Prismic from 'prismic-javascript';
import { setCookie } from 'koa-cookies';

import { PRISMIC_ENDPOINT_API } from '../../lib/config';
import { linkResolver } from '../../lib/prismic';

export const prismicPreviewMiddleware = async ctx => {
  const { token } = ctx.request.query;
  const api = await Prismic.getApi(PRISMIC_ENDPOINT_API, { req: ctx.request });
  const url = await api.previewSession(token, linkResolver, '/')
  setCookie(Prismic.previewCookie, token, {
    maxAge: 30 * 60,
    path: '/',
    httpOnly: false
  })(ctx);
  ctx.redirect(url);
}
