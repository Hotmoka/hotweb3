import { JarStoreTransactionResponseModel } from "./JarStoreTransactionResponseModel";
import { TransactionReferenceModel } from "../values/TransactionReferenceModel";
import { UpdateModel } from "../updates/UpdateModel";
/**
 * A response for a successful transaction that installs a jar in a blockchain.
 */
export declare class JarStoreTransactionSuccessfulResponseModel extends JarStoreTransactionResponseModel {
    /**
     * The jar to install, instrumented.
     */
    instrumentedJar: string;
    /**
     * The dependencies of the jar, previously installed in blockchain.
     * This is a copy of the same information contained in the request.
     */
    dependencies: Array<TransactionReferenceModel>;
    /**
     * The version of the verification tool involved in the verification process.
     */
    verificationToolVersion: number;
    constructor(updates: Array<UpdateModel>, gasConsumedForCPU: string, gasConsumedForRAM: string, gasConsumedForStorage: string, instrumentedJar: string, dependencies: Array<TransactionReferenceModel>, verificationToolVersion: number);
}
