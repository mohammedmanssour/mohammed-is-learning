import DataModel from '../data/DataModel';

export default abstract class Model {
  id: string;

  public save() {
    this.collection().save(this);
  }

  public abstract collection(): DataModel<Model>;
}
