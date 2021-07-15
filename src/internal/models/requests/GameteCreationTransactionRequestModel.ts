import {TransactionReferenceModel} from "../values/TransactionReferenceModel";
import {InitialTransactionRequestModel} from "./InitialTransactionRequestModel";
import {HotmokaException} from "../../exception/HotmokaException";

/**
 * A request for creating an initial gamete. It is an account of class
 * "io.takamaka.code.lang.Gamete" that holds the initial coins of the network.
 */
export class GameteCreationTransactionRequestModel extends InitialTransactionRequestModel {
    /**
     * The amount of coin provided to the gamete.
     */
    initialAmount: string

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
    classpath: TransactionReferenceModel


    /**
     * Builds the transaction request.
     * @param classpath the reference to the jar containing the basic Takamaka classes. This must
     *                  have been already installed by a previous transaction
     * @param initialAmount the amount of green coins provided to the gamete
     * @param redInitialAmount the amount of red coins provided to the gamete
     * @param publicKey the Base64-encoded public key that will be assigned to the gamete
     */
    constructor(classpath: TransactionReferenceModel,
                initialAmount: string,
                redInitialAmount: string,
                publicKey: string,
    ) {
        super()

        if (classpath === null || classpath === undefined) {
            throw new HotmokaException("classpath cannot be null or undefined")
        }

        if (initialAmount === null || initialAmount === undefined) {
            throw new HotmokaException("initialAmount cannot be null")
        }

        if (Number(initialAmount) < 0) {
            throw new HotmokaException("initialAmount cannot be negative")
        }

        if (redInitialAmount === null || redInitialAmount === undefined) {
            throw new HotmokaException("redInitialAmount cannot be null or undefined")
        }

        if (Number(redInitialAmount) < 0) {
            throw new HotmokaException("redInitialAmount cannot be negative")
        }

        if (publicKey === null || publicKey === undefined) {
            throw new HotmokaException("publicKey cannot be null or undefined")
        }

        this.initialAmount = initialAmount
        this.redInitialAmount = redInitialAmount
        this.publicKey = publicKey
        this.classpath = classpath
    }
}