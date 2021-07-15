import { TransactionReferenceModel } from "../values/TransactionReferenceModel";
import { InitialTransactionRequestModel } from "./InitialTransactionRequestModel";
/**
 * A request for a transaction that installs a jar.
 */
export declare class JarStoreInitialTransactionRequestModel extends InitialTransactionRequestModel {
    /**
     * The jar to install.
     */
    jar: string;
    /**
     * The dependencies of the jar, already installed in blockchain
     */
    dependencies: Array<TransactionReferenceModel>;
    /**
     * Builds the transaction request.
     * @param jar the bytes of the jar to install
     * @param dependencies the dependencies of the jar, already installed in blockchain
     * @throws HotmokaException if errors occur
     */
    constructor(jar: string, dependencies: Array<TransactionReferenceModel>);
}
