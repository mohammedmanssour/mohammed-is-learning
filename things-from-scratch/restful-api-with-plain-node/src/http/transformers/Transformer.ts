import JsonResponse from '../JsonResponse';
import Model from '../../models/Model';

export default abstract class Transfromer {
  public abstract transform(model: Model): any;

  public item(model: Model): any {
    return this.transform(model);
  }

  public collection(models: Model[]): any {
    return models.map(model => this.transform(model));
  }
}
