import { MarshallingContext } from "../../marshalling/MarshallingContext";
/**
 * A transaction reference that refers to a transaction in the local store of a node.
 */
export declare class TransactionReferenceModel {
    /**
     * The type of transaction.
     */
    type: string;
    /**
     * The hash of the request that generated the transaction.
     */
    hash: string;
    constructor(type: string, hash: string);
    static into(context: MarshallingContext, transactionReference: TransactionReferenceModel): void;
    /**
     * Marshals an array of transaction references into a given stream.
     * @param transactionReferences the array of transaction references
     * @param context the context holding the stream
     */
    static intoArray(transactionReferences: Array<TransactionReferenceModel>, context: MarshallingContext): void;
}
