import Request from '../Request';
import Response from '../Response';
import JsonResponse from '../JsonResponse';

export default class PingController {
  /**
   * response to ping request
   */
  public index(req: Request, res: Response) {
    JsonResponse.from(res).send({
      code: 1,
      status: 'success',
    });
  }
}
