import { GraphQLObjectType, GraphQLString } from 'graphql';
import { globalIdField } from 'graphql-relay';
import { NodeInterface } from '../../schema/NodeInterface';

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'User data',
  fields: () => ({
    id: globalIdField('User'),
    name: {
      type: GraphQLString,
      resolve: user => user.name,
    },
    email: {
      type: GraphQLString,
      resolve: user => user.email,
    },
  }),
  interfaces: () => [NodeInterface],
});

export default UserType;
