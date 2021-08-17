// this file will play as the user database table

import User from '../models/User';
import DataModel from './DataModel';

export class Users extends DataModel<User> {}

const users = new Users();
export default users;
