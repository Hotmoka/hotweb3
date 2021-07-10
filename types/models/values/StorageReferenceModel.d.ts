import { TransactionReferenceModel } from "./TransactionReferenceModel";
import { MarshallingContext } from "../../internal/marshalling/MarshallingContext";
export declare class StorageReferenceModel {
    /**
     * The transaction that created the object.
     */
    transaction: TransactionReferenceModel;
    /**
     * The progressive number of the object among those that have been created
     * during the same transaction.
     */
    progressive: string;
    constructor(transaction: TransactionReferenceModel, progressive: string);
    static into(context: MarshallingContext, storageReferenceModel: StorageReferenceModel): void;
    static intoWithoutSelector(context: MarshallingContext, storageReferenceModel: StorageReferenceModel): void;
}
