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
     * @throws TransactionRejectedException if the transaction could not be executed
     * @throws CodeExecutionException if the transaction could be executed but led to an exception in the user code in blockchain,
     *                                that is allowed to be thrown by the method
     * @throws TransactionException if the transaction could be executed but led to an exception outside the user code in blockchain,
     *                              or that is not allowed to be thrown by the method
     * @throws HotmokaException if generic errors occur
     */
    getNonceOf(account: StorageReferenceModel): Promise<StorageValueModel>;
}
