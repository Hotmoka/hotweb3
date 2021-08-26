import { RemoteNode } from "../RemoteNode";
export declare class GasHelper {
    private static readonly GAS_LIMIT;
    private readonly remoteNode;
    constructor(remoteNode: RemoteNode);
    /**
     * Yields the gasStation.
     * @private
     * @return the gasStation
     */
    private getGasStation;
    /**
     * Yields the gas price for a transaction.
     * @return the gas price
     * @throws TransactionRejectedException if the transaction could not be executed
     * @throws CodeExecutionException if the transaction could be executed but led to an exception in the user code in blockchain,
     *                                that is allowed to be thrown by the method
     * @throws TransactionException if the transaction could be executed but led to an exception outside the user code in blockchain,
     *                              or that is not allowed to be thrown by the method
     * @throws HotmokaException if generic errors occur
     */
    getGasPrice(): Promise<string>;
}
