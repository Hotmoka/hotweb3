import {TransactionReferenceModel} from "../values/TransactionReferenceModel";
import {InitialTransactionRequestModel} from "./InitialTransactionRequestModel";
import {HotmokaException} from "../../exceptions/HotmokaException";

/**
 * A request for a transaction that installs a jar.
 */
export class JarStoreInitialTransactionRequestModel extends InitialTransactionRequestModel {
    /**
     * The jar to install.
     */
    jar: string

    /**
     * The dependencies of the jar, already installed in blockchain
     */
    dependencies: Array<TransactionReferenceModel>

    /**
     * Builds the transaction request.
     * @param jar the bytes of the jar to install
     * @param dependencies the dependencies of the jar, already installed in blockchain
     * @throws HotmokaException if errors occur
     */
    constructor(jar: string,
                dependencies: Array<TransactionReferenceModel>) {
        super()

        if (!jar) {
            throw new HotmokaException("invalid jar")
        }

        if (dependencies === null || dependencies === undefined) {
            throw new HotmokaException("dependencies cannot be null or undefined")
        }

        for (const dependency of dependencies) {
            if (dependency === null || dependency === undefined) {
                throw new HotmokaException("dependencies cannot hold null or undefined")
            }
        }

        this.jar = jar
        this.dependencies = dependencies
    }
}