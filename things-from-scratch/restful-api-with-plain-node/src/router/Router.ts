import { ServerResponse } from 'http';
import RouterContract from '../contracts/RouterContract';
import Request from '../http/Request';

export default class Router implements RouterContract {
  run(req: Request, res: ServerResponse) {
    res.end('Hello world');
  }
}
