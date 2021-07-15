export class TimeoutException extends Error {

    constructor(message?: string) {
        super(message)
        this.name = "TimeoutException"
        Object.setPrototypeOf(this, TimeoutException.prototype);
    }
}