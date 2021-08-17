import Model from './Model';
import { uniqueId } from '../utils';

export default class User extends Model {
  id: string;
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
    return user;
  }
}
