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
     * during the same transaction. It must a value obtained from a radix of 16 (e.g. parseInt('10', 16))
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

    /**
     * Yields a new {@link StorageReferenceModel} for a blockchain object.
     * @param hash the hash of the object
     * @param progressive the progressive of the object. It defaults to '0'
     */
    public static newStorageReference(hash: string, progressive = '0'): StorageReferenceModel {
        return new StorageReferenceModel(new TransactionReferenceModel('local', hash), parseInt(progressive, 16).toString())
    }

    public static into(context: MarshallingContext, storageReferenceModel: StorageReferenceModel): void {
        context.writeByte(Selectors.SELECTOR_STORAGE_REFERENCE)
        this.intoWithoutSelector(context, storageReferenceModel)
    }

    public static intoWithoutSelector(context: MarshallingContext, storageReferenceModel: StorageReferenceModel): void {
        context.writeStorageReference(storageReferenceModel)
    }

    /**
     * Checks if the provided storage reference is a valid storage reference.
     * @param storageReference the storage reference
     * @return true if the provided storage reference is a valid storage reference, false otherwise
     */
    public static isStorageReference(storageReference: string): boolean {
        try {
            if (storageReference.indexOf('#') === -1) {
                return false
            } else {
                const splitted = storageReference.split('#')
                if (splitted.length !== 2) {
                    return false
                }
                const hash = splitted[0].trim()
                const progressive = splitted[1].trim()

                return hash.length === 64 && !isNaN(parseInt(progressive, 16))
            }
        } catch (e) {
            return false
        }
    }
}