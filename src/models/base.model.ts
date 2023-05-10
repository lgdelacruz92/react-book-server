export class BaseModel<T> {
  data: T;

  constructor(_data: T) {
    this.data = _data;
  }
  toString() {
    return JSON.stringify(this.data);
  }
}
