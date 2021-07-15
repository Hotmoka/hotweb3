import {TransactionReferenceModel} from "./TransactionReferenceModel";
import {MarshallingContext} from "../../marshalling/MarshallingContext";
import {Selectors} from "../../marshalling/Selectors";
import {HotmokaException} from "../../exceptions/HotmokaException";

/**
 * A reference to an object of class type that can be stored in the blockchain.
 * It knows the transaction that created the object. Objects created during the
 * same transaction are disambiguated by a progressive number.
 */
export class StorageReferenceModel {
    /**
     * The transaction that created the object.
     */
    transaction: TransactionReferenceModel

    /**
     * The progressive number of the object among those that have been created
     * during the same transaction.
     */
    progressive: string

    /**
     * Builds a storage reference.
     * @param transaction the transaction that created the object
     * @param progressive the progressive number of the object among those that have been created
     *                    during the same transaction
     */
    constructor(transaction: TransactionReferenceModel, progressive: string) {

        if (!transaction) {
            throw new HotmokaException("transaction cannot be null")
        }

        if (progressive === null || progressive === undefined) {
            throw new HotmokaException("progressive cannot be null or undefined")
        }

        this.transaction = transaction
        this.progressive = progressive
    }

    public static into(context: MarshallingContext, storageReferenceModel: StorageReferenceModel): void {
        context.writeByte(Selectors.SELECTOR_STORAGE_REFERENCE)
        this.intoWithoutSelector(context, storageReferenceModel)
    }

    public static intoWithoutSelector(context: MarshallingContext, storageReferenceModel: StorageReferenceModel): void {
        context.writeStorageReference(storageReferenceModel)
    }
}