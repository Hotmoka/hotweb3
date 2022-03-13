import { StorageReferenceModel } from "../values/StorageReferenceModel";
/**
 * The model holding the information of the gas station.
 */
export declare class GasStation {
    gasStation?: StorageReferenceModel;
    gasPrice?: string;
    maxGasPerTransaction?: string;
    ignoresGasPrice?: boolean;
    targetGasAtReward?: string;
    oblivion?: string;
    oblivionInfo: string;
    initialGasPrice?: string;
    constructor(gasStation?: StorageReferenceModel, gasPrice?: string, maxGasPerTransaction?: string, ignoresGasPrice?: string, targetGasAtReward?: string, oblivion?: string, initialGasPrice?: string);
}
