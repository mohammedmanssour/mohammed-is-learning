import { createServer, IncomingMessage, ServerResponse } from 'http';
import { StringDecoder } from 'string_decoder';
import RouterContract from './contracts/RouterContract';
import Request from './http/Request';

export default class Application {
  private req: Request;
  private res: ServerResponse;

  private router: RouterContract;

  /**
   * handle the server creation boot the application
   */
  private start(req: IncomingMessage, res: ServerResponse) {
    this.req = new Request().capture(req);
    this.res = res;

    const decoder = new StringDecoder('utf-8');
    let buffer = '';
    this.req.original.on('data', data => {
      buffer += decoder.write(data);
    });

    this.req.original.on('end', () => {
      buffer += decoder.end();

      this.boot();
    });
  }

  /**
   * boot up application with the parsed request and response
   */
  private boot() {
    if (this.router) {
      this.router.run(this.req, this.res);
      return;
    }

    this.res.end('🚨 The app router was not intialized.');
  }

  /**
   * set application router
   */
  public setRouter(router: RouterContract): Application {
    this.router = router;
    return this;
  }

  /**
   * create the http server and start listening
   */
  public run() {
    const server = createServer(this.start.bind(this));

    server.listen('3000', () =>
      console.log('✅ server is running and listening to port :3000')
    );
  }
}
