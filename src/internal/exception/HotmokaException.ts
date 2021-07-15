export class HotmokaException extends Error {

    constructor(message?: string) {
        super(message)
        this.name = "HotmokaException"
        Object.setPrototypeOf(this, HotmokaException.prototype);
    }
}