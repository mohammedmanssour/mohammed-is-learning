import { createServer, IncomingMessage, Server, ServerResponse } from 'http';
import { StringDecoder } from 'string_decoder';
import Request from './http/Request';

export default class Application {
  private req: Request;
  private res: ServerResponse;

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
    this.res.end('Hello World');
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
