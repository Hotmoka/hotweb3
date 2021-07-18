import { TransactionReferenceModel } from "./TransactionReferenceModel";
import { MarshallingContext } from "../../marshalling/MarshallingContext";
/**
 * A reference to an object of class type that can be stored in the blockchain.
 * It knows the transaction that created the object. Objects created during the
 * same transaction are disambiguated by a progressive number.
 */
export declare class StorageReferenceModel {
    /**
     * The transaction that created the object.
     */
    transaction: TransactionReferenceModel;
    /**
     * The progressive number of the object among those that have been created
     * during the same transaction. It must a value obtained from a radix of 16 (e.g. parseInt('10', 16))
     */
    progressive: string;
    /**
     * Builds a storage reference.
     * @param transaction the transaction that created the object
     * @param progressive the progressive number of the object among those that have been created
     *                    during the same transaction
     */
    constructor(transaction: TransactionReferenceModel, progressive: string);
    /**
     * Yields a new {@link StorageReferenceModel} for a blockchain object.
     * @param hash the hash of the object
     * @param progressive the progressive of the object. It defaults to '0'
     */
    static newStorageReference(hash: string, progressive?: string): StorageReferenceModel;
    static into(context: MarshallingContext, storageReferenceModel: StorageReferenceModel): void;
    static intoWithoutSelector(context: MarshallingContext, storageReferenceModel: StorageReferenceModel): void;
}
