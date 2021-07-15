import { InfoModel } from "../models/info/InfoModel";
import { RemoteNode } from "../RemoteNode";
/**
 * Helper class to get information about the remote Hotmoka node.
 */
export declare class ManifestHelper {
    private readonly remoteNode;
    constructor(remoteNode: RemoteNode);
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
