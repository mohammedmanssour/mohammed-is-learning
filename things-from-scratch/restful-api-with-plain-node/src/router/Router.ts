import RouterContract from '../contracts/RouterContract';
import Request from '../http/Request';

import IMethod from './IMethod';
import IRoutesMap from './IRoutesMap';
import Route from './Route';
import IRouteAction from './IRouteAction';

import RouteNotFoundException from '../exceptions/RouteNotFoundException';
import Response from '../http/Response';

export default class Router implements RouterContract {
  routes: IRoutesMap;

  fallbackAction: Route;

  constructor() {
    this.routes = {
      GET: [],
      HEAD: [],
      POST: [],
      PUT: [],
      PATCH: [],
      DELETE: [],
    };
  }

  /**
   * add route to the routes map
   */
  public add(method: IMethod, path: string, action: IRouteAction) {
    const route = new Route(method, path, action);
    this.routes[route.method].push(route);
  }

  /**
   * add route with get method to routes map
   */
  public get(path: string, action: IRouteAction) {
    this.add('GET', path, action);
  }

  /**
   * add route with head method to routes map
   */
  public head(path: string, action: IRouteAction) {
    this.add('HEAD', path, action);
  }

  /**
   * add route with post method to routes map
   */
  public post(path: string, action: IRouteAction) {
    this.add('POST', path, action);
  }

  /**
   * add route with put method to routes map
   */
  public put(path: string, action: IRouteAction) {
    this.add('PUT', path, action);
  }

  /**
   * add route with patch method to routes map
   */
  public patch(path: string, action: IRouteAction) {
    this.add('PATCH', path, action);
  }

  /**
   * add route with delete method to routes map
   */
  public delete(path: string, action: IRouteAction) {
    this.add('DELETE', path, action);
  }

  /**
   * fallback action to be called when no route is found
   */
  public fallback(action: IRouteAction) {
    this.fallbackAction = new Route('ANY', 'any', action);
  }

  findRoute(req: Request): Route | undefined {
    const routes: Route[] = this.routes[req.method.toUpperCase()];

    if (!routes.length) {
      return;
    }

    return routes.find(route => route.matches(req));
  }

  /**
   * dispatch route action
   */
  public dispatch(route: Route, req: Request, res: Response) {
    const handler = route.action;
    if (typeof handler === 'function') {
      handler.call(null, req, res, req.params);
      return;
    }

    handler[1].call(handler[0], req, res, req.params);
  }

  run(req: Request, res: Response) {
    const route = this.findRoute(req);
    if (route) {
      return this.dispatch(route, req, res);
    }

    if (this.fallbackAction) {
      return this.dispatch(this.fallbackAction, req, res);
    }

    return new RouteNotFoundException().render(req, res);
  }
}
