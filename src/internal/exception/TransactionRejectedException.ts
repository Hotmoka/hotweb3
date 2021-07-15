export class TransactionRejectedException extends Error {

    constructor(message?: string) {
        super(message)
        this.name = "TransactionRejectedException"
        Object.setPrototypeOf(this, TransactionRejectedException.prototype);
    }
}