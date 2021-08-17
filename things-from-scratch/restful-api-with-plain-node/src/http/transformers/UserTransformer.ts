import Transformer from './Transformer';
import User from '../../models/User';

export default class UserTransformer extends Transformer {
  public transform(model: User) {
    return {
      id: model.id,
      name: model.name,
      email: model.email,
    };
  }
}
