export class HotmokaError extends Error {

    constructor(message: string, exceptionClassName: string) {
        super(exceptionClassName ? exceptionClassName + "@" + message : message)
        this.name = "HotmokaError"
    }

}
