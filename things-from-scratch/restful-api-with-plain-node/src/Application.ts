import { createServer, IncomingMessage, ServerResponse } from 'http';
import { StringDecoder } from 'string_decoder';
import RouterContract from './contracts/RouterContract';
import Request from './http/Request';
import Response from './http/Response';

export default class Application {
  private router: RouterContract;

  /**
   * handle the server creation boot the application
   */
  private start(req: IncomingMessage, res: ServerResponse) {
    console.log('new request to ', req.url);
    const request = new Request().capture(req);
    const response = new Response(res);

    const decoder = new StringDecoder('utf-8');
    let buffer = '';
    request.original.on('data', data => {
      buffer += decoder.write(data);
    });

    request.original.on('end', () => {
      buffer += decoder.end();

      request.setBody(buffer);

      this.boot(request, response);
    });
  }

  /**
   * boot up application with the parsed request and response
   */
  private boot(request: Request, response: Response) {
    if (this.router) {
      this.router.run(request, response);
      return;
    }

    response.setStatusCode(500).send('🚨 The app router was not intialized.');
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
