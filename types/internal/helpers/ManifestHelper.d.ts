import { InfoModel } from "../models/info/InfoModel";
import { RemoteNode } from "../RemoteNode";
import { StorageReferenceModel } from "../models/values/StorageReferenceModel";
/**
 * Helper class to get information about the remote Hotmoka node.
 */
export declare class ManifestHelper {
    private readonly remoteNode;
    constructor(remoteNode: RemoteNode);
    /**
     * Yields the chainId of the remote node.
     * @return the storage reference of the gamete
     * @throws TransactionRejectedException if the transaction could not be executed
     * @throws CodeExecutionException if the transaction could be executed but led to an exception in the user code in blockchain,
     *                                that is allowed to be thrown by the method
     * @throws TransactionException if the transaction could be executed but led to an exception outside the user code in blockchain,
     *                              or that is not allowed to be thrown by the method
     * @throws HotmokaException if generic errors occur
     */
    getChainId(): Promise<string>;
    /**
     * Yields the gamete of the remote node.
     * @return the storage reference of the gamete
     * @throws TransactionRejectedException if the transaction could not be executed
     * @throws CodeExecutionException if the transaction could be executed but led to an exception in the user code in blockchain,
     *                                that is allowed to be thrown by the method
     * @throws TransactionException if the transaction could be executed but led to an exception outside the user code in blockchain,
     *                              or that is not allowed to be thrown by the method
     * @throws HotmokaException if generic errors occur
     */
    getGamete(): Promise<StorageReferenceModel>;
    /**
     * Yields the info of a remote node.
     * @return the info of the node
     * @throws TransactionRejectedException if the transaction could not be executed
     * @throws CodeExecutionException if the transaction could be executed but led to an exception in the user code in blockchain,
     *                                that is allowed to be thrown by the method
     * @throws TransactionException if the transaction could be executed but led to an exception outside the user code in blockchain,
     *                              or that is not allowed to be thrown by the method
     * @throws HotmokaException if generic errors occur
     */
    info(): Promise<InfoModel>;
    private buildInstanceMethodCallTransactionModel;
    private getValidator;
}
