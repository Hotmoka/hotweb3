import { TransactionReferenceModel } from "../values/TransactionReferenceModel";
import { InitialTransactionRequestModel } from "./InitialTransactionRequestModel";
/**
 * A request for creating an initial gamete. It is an account of class
 * "io.takamaka.code.lang.Gamete" that holds the initial coins of the network.
 */
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
    /**
     * Builds the transaction request.
     * @param classpath the reference to the jar containing the basic Takamaka classes. This must
     *                  have been already installed by a previous transaction
     * @param initialAmount the amount of green coins provided to the gamete
     * @param redInitialAmount the amount of red coins provided to the gamete
     * @param publicKey the Base64-encoded public key that will be assigned to the gamete
     */
    constructor(classpath: TransactionReferenceModel, initialAmount: string, redInitialAmount: string, publicKey: string);
}
