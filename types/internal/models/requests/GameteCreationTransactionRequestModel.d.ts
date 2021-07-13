import { TransactionReferenceModel } from "../values/TransactionReferenceModel";
import { InitialTransactionRequestModel } from "./InitialTransactionRequestModel";
export declare class GameteCreationTransactionRequestModel extends InitialTransactionRequestModel {
    /**
     * The amount of coin provided to the gamete.
     */
    initialAmount: string;
    /**
     * The amount of red coin provided to the gamete.
     */
    redInitialAmount: string;
    /**
     * The Base64-encoded public key that will be assigned to the gamete.
     */
    publicKey: string;
    /**
     * The reference to the jar containing the basic Takamaka classes. This must
     * have been already installed by a previous transaction.
     */
    classpath: TransactionReferenceModel;
    constructor(initialAmount: string, redInitialAmount: string, publicKey: string, classpath: TransactionReferenceModel);
}
