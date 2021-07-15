import {MarshallingContext} from "../../marshalling/MarshallingContext";
import {HotmokaException} from "../../exceptions/HotmokaException";

/**
 * A transaction reference that refers to a transaction in the local store of a node.
 */
export class TransactionReferenceModel {
    /**
     * The type of transaction.
     */
    type: string

    /**
     * The hash of the request that generated the transaction.
     */
    hash: string

    /**
     * Builds a transaction request.
     * @param type the type of the transaction (must be "local")
     * @param hash the hash of the request that generated the transaction
     */
    constructor(type: string, hash: string) {

        if (!hash) {
            throw new HotmokaException("hash cannot be null")
        }

        if (!type || type !== 'local') {
            throw new HotmokaException("type must be local")
        }

        this.type = type
        this.hash = hash
    }

    /**
     * Marshals an object into a stream.
     * @param context the context holding the stream
     * @param transactionReference the object to marshal
     */
    public static into(context: MarshallingContext, transactionReference: TransactionReferenceModel): void {
        context.writeTransactionReference(transactionReference)
    }

    /**
     * Marshals an array of transaction references into a given stream.
     * @param transactionReferences the array of transaction references
     * @param context the context holding the stream
     */
    public static intoArray(transactionReferences: Array<TransactionReferenceModel>, context: MarshallingContext): void {
        context.writeCompactInt(transactionReferences.length)
        transactionReferences.forEach(transactionReference => TransactionReferenceModel.into(context, transactionReference))
    }
}