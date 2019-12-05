import UserType from '../modules/user/UserType'
import * as UserLoader from '../modules/user/UserLoader'

import { nodeDefinitions, fromGlobalId } from 'graphql-relay';

const { nodeField, nodeInterface } = nodeDefinitions(
  async (globalId, context) => {
    const { id, type } = fromGlobalId(globalId);
    if (type === 'User') return UserLoader.load(context, id);
  },
  obj => {
    if (obj instanceof UserLoader.default) return UserType;
  }
);

export const NodeInterface = nodeInterface;
export const NodeField = nodeField;
