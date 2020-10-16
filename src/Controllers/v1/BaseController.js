export default class BaseController {

    constructor() {
        this.stop = this.dispose.bind(this);
    }

    dispose() { }

}