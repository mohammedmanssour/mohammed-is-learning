import { ServerResponse } from 'http';
import Request from '../http/Request';

export default interface RouterContract {
  /**
   * route the request to the available routers
   */
  run(req: Request, res: ServerResponse);
}
