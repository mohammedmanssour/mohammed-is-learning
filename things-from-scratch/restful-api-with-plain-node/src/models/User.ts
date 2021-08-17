import Model from './Model';
import { uniqueId } from '../utils';

import users, { Users } from '../data/Users';

export default class User extends Model {
  name: string;
  email: string;

  /**
   * create new User instance
   */
  public static create(data): User {
    const user = new User();
    user.id = uniqueId('user-');
    user.email = data.email;
    user.name = data.name;

    user.save();
    return user;
  }

  public collection(): Users {
    return users;
  }
}
