import { TransactionReferenceModel } from "../values/TransactionReferenceModel";
import { InitialTransactionRequestModel } from "./InitialTransactionRequestModel";
/**
 * The model of an initial jar store transaction request.
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
    constructor(jar: string, dependencies: Array<TransactionReferenceModel>);
}
