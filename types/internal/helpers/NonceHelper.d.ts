import { RemoteNode } from "../RemoteNode";
import { StorageReferenceModel } from "../models/values/StorageReferenceModel";
import { StorageValueModel } from "../models/values/StorageValueModel";
export declare class NonceHelper {
    private static readonly GAS_LIMIT;
    private readonly remoteNode;
    constructor(remoteNode: RemoteNode);
    /**
     * Yields the nonce of an account.
     * @param account the account
     * @return the nonce of the account
     */
    getNonceOf(account: StorageReferenceModel): Promise<StorageValueModel>;
}
