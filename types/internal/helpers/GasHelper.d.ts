import { RemoteNode } from "../RemoteNode";
import { StorageValueModel } from "../models/values/StorageValueModel";
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
     */
    getGasPrice(): Promise<StorageValueModel>;
}
