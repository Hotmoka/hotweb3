import { NonInitialTransactionRequestModel } from "./NonInitialTransactionRequestModel";
import { TransactionReferenceModel } from "../values/TransactionReferenceModel";
import { StorageReferenceModel } from "../values/StorageReferenceModel";
import { Signer } from "../../signature/Signer";
import { MarshallingContext } from "../../marshalling/MarshallingContext";
/**
 * A request for a transaction that installs a jar in an initialized node.
 */
export declare class JarStoreTransactionRequestModel extends NonInitialTransactionRequestModel {
    /**
     * The string of the jar to install.
     */
    jar: string;
    /**
     * The dependencies of the jar, already installed in blockchain.
     */
    dependencies: Array<TransactionReferenceModel>;
    /**
     * The chain identifier where this request can be executed, to forbid transaction replay across chains.
     */
    chainId: string;
    /**
     * The signature of the request.
     */
    signature: string;
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
    constructor(caller: StorageReferenceModel, nonce: string, chainId: string, gasLimit: string, gasPrice: string, classpath: TransactionReferenceModel, jar: string, dependencies: Array<TransactionReferenceModel>, signer?: Signer);
    /**
     * Marshals this object into a stream.
     * @param context the context holding the stream
     */
    into(context: MarshallingContext): void;
    protected intoWithoutSignature(context: MarshallingContext): void;
}
