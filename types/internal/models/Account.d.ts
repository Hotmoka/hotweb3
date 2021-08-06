import { StorageReferenceModel } from "./values/StorageReferenceModel";
export declare class Account {
    readonly entropy: string;
    readonly storageReference: StorageReferenceModel;
    constructor(entropy: string, hashOfTransactionReference: string);
}
