import {StorageReferenceModel} from "../values/StorageReferenceModel";
import {TransactionReferenceModel} from "../values/TransactionReferenceModel";
import {InitialTransactionRequestModel} from "./InitialTransactionRequestModel";
import {HotmokaException} from "../../exception/HotmokaException";

/**
 * A request to initialize a node. It sets the manifest of a node.
 * After the manifest has been set, no more initial transactions can be executed,
 * hence the node is considered initialized. The manifest cannot be set twice.
 */
export class InitializationTransactionRequestModel extends InitialTransactionRequestModel {
    /**
     * The reference to the jar containing the basic Takamaka classes. This must
     * have been already installed by a previous transaction.
     */
    manifest: StorageReferenceModel

    /**
     * The storage reference that must be set as manifest.
     */
    classpath: TransactionReferenceModel

    /**
     * Builds the transaction request.
     * @param classpath the reference to the jar containing the basic Takamaka classes. This must
     *                  have been already installed by a previous transaction
     * @param manifest the storage reference that must be set as manifest
     */
    constructor(classpath: TransactionReferenceModel, manifest: StorageReferenceModel) {
        super()

        if (classpath === null || classpath === undefined) {
            throw new HotmokaException("classpath cannot be null or undefined")
        }

        if (manifest === null || manifest === undefined) {
            throw new HotmokaException("manifest cannot be null or undefined")
        }

        this.manifest = manifest
        this.classpath = classpath
    }
}