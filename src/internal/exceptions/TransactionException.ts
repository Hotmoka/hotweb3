export class TransactionException extends Error {

    constructor(message?: string) {
        super(message)
        this.name = "TransactionException"
        Object.setPrototypeOf(this, TransactionException.prototype);
    }
}