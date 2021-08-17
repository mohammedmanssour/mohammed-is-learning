import { ServerResponse } from 'http';

export default class Response {
  original: ServerResponse;

  headers: {
    [key: string]: string;
  };

  statusCode: number;

  onResponseTerminated: () => void;

  constructor(res: ServerResponse) {
    this.original = res;
    this.statusCode = 200;
    this.headers = {
      'Content-Type': 'text/html',
    };
  }

  /**
   * set header
   */
  public header(header: string, value: string): this {
    this.headers[header] = value;
    return this;
  }

  /**
   * mergeHeaders merge the headers passed as a parameter with the current response headers
   */
  public mergeHeaders(headers): this {
    this.headers = {
      ...this.headers,
      ...headers,
    };

    return this;
  }

  /**
   * setStatusCode
   */
  public setStatusCode(statusCode: number): this {
    this.statusCode = statusCode;
    return this;
  }

  /**
   * execute callback after the response stream is finished
   */
  public after(cb: () => void): this {
    this.onResponseTerminated = cb;
    return this;
  }

  /**
   * format data before sending
   */
  public prepareData(data) {
    return data;
  }

  /**
   * prepare response and end
   */
  public send(data): void {
    this.original.writeHead(this.statusCode, this.headers);
    this.original.end(this.prepareData(data), this.onResponseTerminated);
  }

  /**
   * convert response to another type response
   */
  public static from(res: Response): Response {
    return new this(res.original);
  }
}
