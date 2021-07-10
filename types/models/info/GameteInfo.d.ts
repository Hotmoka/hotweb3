import { StorageReferenceModel } from "../values/StorageReferenceModel";
export declare class GameteInfo {
    gamete?: StorageReferenceModel;
    balanceOfGamete?: string;
    redBalance?: string;
    maxFaucet?: string;
    maxRedFaucet?: string;
    constructor(gamete?: StorageReferenceModel, balanceOfGamete?: string, redBalance?: string, maxFaucet?: string, maxRedFaucet?: string);
}
