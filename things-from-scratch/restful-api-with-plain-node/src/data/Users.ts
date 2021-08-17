// this file will play as the user database table

import User from '../models/User';
import { hash } from '../utils/index';
import DataModel from './DataModel';

export class Users extends DataModel<User> {
  public attempt(email: string, password: string): User {
    const hashed = hash(password);

    const entry = Object.entries(this.data).find(
      ([key, user]) => user.email === email && user.password === hashed
    );

    if (!entry) {
      return null;
    }

    return entry[1];
  }
}

const users = new Users();
export default users;
