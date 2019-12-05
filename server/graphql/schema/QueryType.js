import { GraphQLObjectType } from 'graphql';
import { NodeField } from './NodeInterface';

import UserType from '../modules/user/UserType'

export default new GraphQLObjectType({
  name: 'Query',
  description: 'The root of all queries',
  fields: () => ({
    node: NodeField,
    me: {
      type: UserType,
      resolve: (_, args, context) => {
        return context && context.user;
      },
    },
  })
})
