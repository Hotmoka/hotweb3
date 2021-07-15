import { StorageReferenceModel } from "../values/StorageReferenceModel";
/**
 * The model holding the information of the gamete.
 */
export declare class GameteInfo {
    gamete?: StorageReferenceModel;
    balanceOfGamete?: string;
    redBalance?: string;
    maxFaucet?: string;
    maxRedFaucet?: string;
    constructor(gamete?: StorageReferenceModel, balanceOfGamete?: string, redBalance?: string, maxFaucet?: string, maxRedFaucet?: string);
}
