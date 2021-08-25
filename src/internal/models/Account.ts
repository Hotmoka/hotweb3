import {StorageReferenceModel} from "./values/StorageReferenceModel";

export class Account {
    public readonly entropy: string
    public readonly name: string
    public readonly balance: string
    public readonly reference?: StorageReferenceModel

    constructor(entropy: string, name: string, balance: string, reference?: StorageReferenceModel) {
        this.entropy = entropy
        this.name = name
        this.balance = balance
        this.reference = reference
    }
}