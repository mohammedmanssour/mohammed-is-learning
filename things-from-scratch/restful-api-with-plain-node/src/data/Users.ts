// this file will play as the user database table

import User from '../models/User';

export class Users {
  data: User[];

  public constructor() {
    this.data = [];
  }
}

const users = new Users();
export default users;
