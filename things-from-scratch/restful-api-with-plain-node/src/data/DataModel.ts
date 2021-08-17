import Model from '../models/Model';

export default class DataModel<T extends Model> {
  data: {
    [key: string]: T;
  };

  constructor() {
    this.data = {};
  }

  save(model: T) {
    console.log('saving model', model);
    this.data[model.id] = model;
  }
}
