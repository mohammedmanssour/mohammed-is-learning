import HttpException from './HttpException';

export default class RouteNotFoundException extends HttpException {
  getStatusCode() {
    return 404;
  }

  getMessage() {
    return 'Route not found';
  }
}
