import Request from '../http/Request';
import Response from '../http/Response';
import IMethod from './IMethod';
import IRouteAction from './IRouteAction';

export default class Route {
  method: IMethod;
  path: string;
  action: IRouteAction;

  params: string[];

  // regex pattern no the regex itself
  regex: string;

  constructor(method: IMethod, path: string, action: IRouteAction) {
    this.method = method;
    this.path = path;
    this.action = action;

    this.params = [];

    this.compile();
  }

  get hasParams(): boolean {
    return Object.keys(this.params).length > 0;
  }

  /**
   * check if request path matches the route path
   */
  matches(req: Request): boolean {
    const matches = new RegExp(this.regex, 'g').exec(req.path);

    if (!matches) {
      return false;
    }

    if (!this.hasParams) {
      return true;
    }

    // popoulate params
    this.params.forEach((param, index) => {
      req.setParam(param, matches[index + 1]);
    });

    return true;
  }

  /**
   * convert route path into regex that can be used to check against request path
   */
  private compile() {
    const regex = new RegExp(/\{(\w+?)\}/g);
    const matches = this.path.match(regex);
    if (!matches || !matches.length) {
      this.regex = '^' + this.path.replace(/\//g, '\\/') + '$';
      return;
    }

    matches.forEach(match => {
      const variableName = match.substr(1, match.length - 2);
      this.params.push(variableName);
    });

    let normalize = this.path.replace(/\//g, '\\/');
    this.regex = normalize.replace(regex, '([A-Z0-9]+)');
  }
}
