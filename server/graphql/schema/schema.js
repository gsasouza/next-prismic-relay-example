import { GraphQLSchema } from 'graphql';
import { makeRemoteExecutableSchema, mergeSchemas } from 'graphql-tools';
import { PrismicLink } from 'apollo-link-prismic';
import { introspectSchema } from 'graphql-tools';
import { setContext } from 'apollo-link-context';
import Prismic from 'prismic-javascript';

import { PRISMIC_ACCESS_TOKEN, PRISMIC_ENDPOINT } from '../../../lib/config'
import QueryType from './QueryType'

export const getSchema = async () => {

  const prismicLink = setContext((_, { graphqlContext: ctx }) => {
    if (ctx && ctx.cookie && ctx.cookie[Prismic.previewCookie]) {
      return { headers: { ...ctx.request.headers, 'Prismic-ref': ctx.cookie[Prismic.previewCookie] } }
    }
    return {}
  }).concat(
    PrismicLink({
      uri: PRISMIC_ENDPOINT,
      accessToken: PRISMIC_ACCESS_TOKEN,
    })
  )

  const prismicSchema = makeRemoteExecutableSchema({
    link: prismicLink,
    schema: await introspectSchema(prismicLink)
  });

  const localSchema = new GraphQLSchema({
    query: QueryType,
  });
  // return localSchema

  return mergeSchemas({
    schemas: [prismicSchema, localSchema]
  });
}
