/**
 * The model of a transaction reference.
 */
import { MarshallingContext } from "../../internal/marshalling/MarshallingContext";
export declare class TransactionReferenceModel {
    /**
     * The type of transaction.
     */
    type: string;
    /**
     * Used at least for local transactions.
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
