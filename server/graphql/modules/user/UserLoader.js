import DataLoader from 'dataloader';
import users from './mockedUsers'

export default class User {

  constructor(data) {
    this.id = data._id;
    this._id = data._id;
    this.name = data.name;
    this.email = data.email;
  }
}

export const getLoader = () => new DataLoader(ids => users.filter(({ id }) => ids.includes(id)));

const viewerCanSee = (context) => !!context.user;

export const load = async (context, id) => {
  if (!id) return null;
  try {
    const data = await context.dataloaders.UserLoader.load(id);
    return viewerCanSee(context) ? new User(data) : null;
  } catch (err) {
    return null;
  }
};

export const clearCache = ({ dataloaders }, id) => {
  return dataloaders.UserLoader.clear(id.toString());
};

