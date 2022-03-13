import { TransactionReferenceModel } from "../values/TransactionReferenceModel";
import { StorageReferenceModel } from "../values/StorageReferenceModel";
import { GameteInfo } from "./GameteInfo";
import { GasStation } from "./GasStation";
import { Validators } from "./Validators";
import { InitialValidators } from "./InitialValidators";
/**
 * The model holding the information of a remote Hotmoka node.
 */
export declare class InfoModel {
    takamakaCode?: TransactionReferenceModel;
    manifest?: StorageReferenceModel;
    accountsLedger?: StorageReferenceModel;
    chainId?: string;
    versions?: StorageReferenceModel;
    verificationVersion?: string;
    maxErrorLength?: number;
    maxDependencies?: number;
    maxCumulativeSizeOfDependencies?: number;
    allowsSelfCharged?: boolean;
    allowsUnsignedFaucet?: boolean;
    allowsMintBurnFromGamete?: boolean;
    skipsVerification?: boolean;
    signature?: string;
    gameteInfo?: GameteInfo;
    gasStation?: GasStation;
    validators?: Validators;
    initialValidators?: InitialValidators;
}
