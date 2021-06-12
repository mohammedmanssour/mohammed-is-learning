import Request from '../http/Request';
import Response from '../http/Response';

export default interface RouterContract {
  /**
   * route the request to the available routers
   */
  run(req: Request, res: Response);
}
