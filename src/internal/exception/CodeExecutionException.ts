export class CodeExecutionException extends Error {

    constructor(message?: string) {
        super(message)
        this.name = "CodeExecutionException"
        Object.setPrototypeOf(this, CodeExecutionException.prototype);
    }
}