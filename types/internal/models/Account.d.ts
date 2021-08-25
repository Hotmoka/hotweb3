import { StorageReferenceModel } from "./values/StorageReferenceModel";
export declare class Account {
    /**
     * The entropy that was used to generate the key pair of the account. Only the
     * public key of the key pair is stored in the Hotmoka node. Note that this entropy
     * is useless if the associated password is not known, that, merged with this entropy,
     * allows one to reconstruct the key pair. The password is not stored anywhere, it should
     * be remembered by the user.
     */
    readonly entropy: string;
    /**
     * The name given to the account. This is not contained in the store of the Hotmoka
     * node, but only maintained locally.
     */
    readonly name: string;
    /**
     * The balance of the account in the storage of the Hotmoka node, in Panareas.
     */
    readonly balance: string;
    /**
     * The Base64 encoded public key of the account, derived from the entropy and the password.
     */
    readonly publicKey: string;
    /**
     * The reference of the account in the store of the Hotmoka node.
     * This might be missing if we are waiting for somebody else
     * to create the account and bind it to the entropy.
     */
    readonly reference?: StorageReferenceModel;
    constructor(entropy: string, publicKey: string, name: string, balance: string, reference?: StorageReferenceModel);
}
