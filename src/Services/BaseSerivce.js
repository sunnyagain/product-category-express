export default class BaseService {
  constructor() {
    this.stop = this.dispose.bind(this);
  }
  dispose() { }
}