import { StorageReferenceModel } from "../values/StorageReferenceModel";
export declare class GasStation {
    gasStation?: StorageReferenceModel;
    gasPrice?: string;
    maxGasPerTransaction?: string;
    ignoresGasPrice?: boolean;
    targetGasAtReward?: string;
    inflation?: string;
    oblivion?: string;
    inflationInfo: string;
    oblivionInfo: string;
    constructor(gasStation?: StorageReferenceModel, gasPrice?: string, maxGasPerTransaction?: string, ignoresGasPrice?: string, targetGasAtReward?: string, inflation?: string, oblivion?: string);
}
