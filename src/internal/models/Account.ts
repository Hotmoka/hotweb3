import {StorageReferenceModel} from "./values/StorageReferenceModel";

export class Account {
    public readonly entropy: string
    public readonly storageReference: StorageReferenceModel

    constructor(entropy: string, hashOfTransactionReference: string) {
        this.entropy = entropy
        this.storageReference = StorageReferenceModel.newStorageReference(hashOfTransactionReference, '0')
    }
}