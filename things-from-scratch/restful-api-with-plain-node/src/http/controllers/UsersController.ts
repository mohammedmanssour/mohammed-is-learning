import Request from '../Request';
import Response from '../Response';
import JsonResponse from '../JsonResponse';

import User from '../../models/User';
import users from '../../data/Users';
import UserTransformer from '../transformers/UserTransformer';
import { hash } from '../../utils/index';
import JWT from '../../utils/JWT';

export default class UsersController {
  /**
   * store new user in the database
   * @param req Request
   * @param res Response
   */
  public store(req: Request, res: Response) {
    //TODO:: add validation

    const data = {
      ...req.body,
      password: hash(req.get('password')),
    };

    console.log(data);

    const user = User.create(data);

    return JsonResponse.from(res).send({
      meta: {
        code: 1,
        message: 'success',
      },
      data: new UserTransformer().item(user),
    });
  }

  public attemptLogin(req: Request, res: Response) {
    const response = JsonResponse.from(res);

    //TODO:: add validation
    const user = users.attempt(req.get('email'), req.get('password'));
    if (!user) {
      response.send({
        code: 0,
        message: 'Failure',
        errors: {
          email: 'Email or password is incorrect',
        },
      });
      return;
    }

    const token = new JWT().make({ id: user.id });

    return JsonResponse.from(res).send({
      meta: {
        code: 1,
        message: 'success',
        token,
      },
      data: new UserTransformer().item(user),
    });
  }
}
