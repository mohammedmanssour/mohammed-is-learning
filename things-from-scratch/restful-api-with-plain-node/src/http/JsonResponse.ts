import { ServerResponse } from 'http';
import Response from './Response';

export default class JsonResponse extends Response {
  constructor(res: ServerResponse) {
    super(res);
    this.headers = {
      'Content-Type': 'application/json',
    };
  }

  /**
   * prepareData
   */
  public prepareData(data) {
    return JSON.stringify(data);
  }
}
