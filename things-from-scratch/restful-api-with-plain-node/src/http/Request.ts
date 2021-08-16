import { IncomingMessage, IncomingHttpHeaders } from 'http';
import { URL, URLSearchParams } from 'url';
import IParams from '../router/IParams';

export default class Request {
  original: IncomingMessage;

  // url path
  path: string;

  // url query string
  query: URLSearchParams;

  // url params
  params: IParams;

  body: {
    [key: string]: any;
  };

  constructor() {}

  /**
   * get request host
   */
  get host(): string {
    return this.original.headers.host;
  }

  /**
   * get request method
   */
  get method(): string {
    return this.original.method?.toLowerCase();
  }

  get headers(): IncomingHttpHeaders {
    return this.original.headers;
  }

  /**
   * get data from url params, query string or request body
   *
   * priority is for params and then comes query strings
   */
  get(key: string, defaultValue: any = null): any {
    if (this.params[key]) {
      return this.params[key];
    }

    if (this.query.has(key)) {
      return this.query.get(key);
    }

    if (this.body[key]) {
      return this.body[key];
    }

    return defaultValue;
  }

  /**
   * parse the original request to get get path, method, headers and body
   *
   * @returns Request
   */
  public capture(req: IncomingMessage): Request {
    this.original = req;
    this.params = {};
    this.body = {};
    this.extractURLInformation();

    return this;
  }

  /**
   * parseBody parse body
   */
  public setBody(body: string) {
    if (
      ['POST', 'PUT', 'PATCH'].includes(this.method.toUpperCase()) &&
      this.headers['content-type'] === 'application/json' &&
      body.length > 0
    ) {
      this.body = JSON.parse(body + '');
    }
  }

  /**
   * extract path and query strings from the URL
   */
  private extractURLInformation() {
    // parse url for path and search queries
    var baseURL = 'http://' + this.host + '/';
    const url = new URL(this.original.url, baseURL);

    this.path = url.pathname.replace(/^\/|\/$/g, '');

    this.query = url.searchParams;
  }

  /**
   * setParam set param variable
   */
  public setParam(key: string, value: string) {
    this.params[key] = value;
  }
}
