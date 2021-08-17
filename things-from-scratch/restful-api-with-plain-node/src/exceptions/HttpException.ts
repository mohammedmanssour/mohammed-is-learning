import Request from '../http/Request';
import Response from '../http/Response';

export default class HttpException {
  getStatusCode(): number {
    return 200;
  }

  getMessage(): string {
    return 'ok';
  }

  getHeaders() {
    return {};
  }

  render(_, res: Response) {
    res
      .setStatusCode(this.getStatusCode())
      .mergeHeaders(this.getHeaders())
      .send(this.getMessage());
  }
}
