export class InterruptedException extends Error {

    constructor(message?: string) {
        super(message)
        this.name = "InterruptedException"
        Object.setPrototypeOf(this, InterruptedException.prototype);
    }
}