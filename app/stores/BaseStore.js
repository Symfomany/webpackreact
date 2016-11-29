import { EventEmitter } from 'events';


/**
 * Base Store
 * @export
 * @class BaseStore
 * @extends {EventEmitter}
 */
export default class BaseStore extends EventEmitter {

    constructor(...args) {
        super(...args);
        this.data = new Set([]);
    }

    setAll(items) {
        this.data = new Set(items);
        this.emitChange(); //emit changes for react views
    }

    getAll() {
        return Array.from(this.data);
    }

    set(item) {
        if (!this.data.has(item)) {
            this.data.add(item);
            this.emitChange();
        }
    }

    remove(item) {
        this.data.delete(item);
        this.emitChange();
    }
}