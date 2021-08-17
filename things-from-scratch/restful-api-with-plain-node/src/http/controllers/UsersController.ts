import Request from '../Request';
import Response from '../Response';

import User from '../../models/User';
import UserTransformer from '../transformers/UserTransformer';
import JsonResponse from '../JsonResponse';

export default class UsersController {
  /**
   * store new user in the database
   * @param req Request
   * @param res Response
   */
  public store(req: Request, res: Response) {
    const user = User.create(req.body);

    return JsonResponse.from(res).send(new UserTransformer().item(user));
  }
}
