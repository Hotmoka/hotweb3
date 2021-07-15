import {NonInitialTransactionRequestModel} from "./NonInitialTransactionRequestModel";
import {TransactionReferenceModel} from "../values/TransactionReferenceModel";
import {StorageReferenceModel} from "../values/StorageReferenceModel";
import {Signer} from "../../signature/Signer";
import {Buffer} from "buffer";
import {MarshallingContext} from "../../marshalling/MarshallingContext";
import {Selectors} from "../../marshalling/Selectors";
import {HotmokaException} from "../../exception/HotmokaException";


/**
 * A request for a transaction that installs a jar in an initialized node.
 */
export class JarStoreTransactionRequestModel extends NonInitialTransactionRequestModel {
    /**
     * The string of the jar to install.
     */
    jar: string

    /**
     * The dependencies of the jar, already installed in blockchain.
     */
    dependencies: Array<TransactionReferenceModel>

    /**
     * The chain identifier where this request can be executed, to forbid transaction replay across chains.
     */
    chainId: string

    /**
     * The signature of the request.
     */
    signature: string


    /**
     * Builds the transaction request.
     * @param caller the externally owned caller contract that pays for the transaction
     * @param nonce the nonce used for transaction ordering and to forbid transaction replay; it is relative to the caller
     * @param chainId the chain identifier where this request can be executed, to forbid transaction replay across chains
     * @param gasLimit the maximal amount of gas that can be consumed by the transaction
     * @param gasPrice the coins payed for each unit of gas consumed by the transaction
     * @param classpath the class path where the caller is interpreted
     * @param jar the bytes of the jar to install
     * @param dependencies the dependencies of the jar, already installed in blockchain
     * @param signer the signer of the request
     * @throws HotmokaException if errors occur
     */
    constructor(caller: StorageReferenceModel,
                nonce: string,
                chainId: string,
                gasLimit: string,
                gasPrice: string,
                classpath: TransactionReferenceModel,
                jar: string,
                dependencies: Array<TransactionReferenceModel>,
                signer?: Signer
    ) {
        super(caller, nonce, classpath, gasLimit, gasPrice)

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

        if (chainId === null || chainId === undefined) {
            throw new HotmokaException("chainId cannot be null or undefined")
        }

        this.jar = jar
        this.dependencies = dependencies
        this.chainId = chainId
        this.signature = signer ? signer.sign(this.marshall()) : ''
    }

    /**
     * Marshals this object into a stream.
     * @param context the context holding the stream
     */
    public into(context: MarshallingContext): void {
       this.intoWithoutSignature(context)
    }

    protected intoWithoutSignature(context: MarshallingContext): void {
        const jarBuffer = Buffer.from(this.jar, 'base64')

        context.writeByte(Selectors.SELECTOR_JAR_STORE)
        context.writeString(this.chainId)
        super.intoWithoutSignature(context)
        context.writeCompactInt(jarBuffer.length)
        context.writeBuffer(jarBuffer)
        TransactionReferenceModel.intoArray(this.dependencies, context)
    }
}