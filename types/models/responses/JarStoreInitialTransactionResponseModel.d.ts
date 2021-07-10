import { TransactionResponseModel } from "./TransactionResponseModel";
import { TransactionReferenceModel } from "../values/TransactionReferenceModel";
export declare class JarStoreInitialTransactionResponseModel extends TransactionResponseModel {
    /**
     * The jar to install, instrumented.
     */
    instrumentedJar: string;
    /**
     * The dependencies of the jar, previously installed in blockchain.
     * This is a copy of the same information contained in the request.
     */
    dependencies: Array<TransactionReferenceModel>;
    constructor(instrumentedJar: string, dependencies: Array<TransactionReferenceModel>);
}
