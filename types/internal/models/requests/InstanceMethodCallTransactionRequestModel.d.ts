import { StorageReferenceModel } from "../values/StorageReferenceModel";
import { TransactionReferenceModel } from "../values/TransactionReferenceModel";
import { MethodSignatureModel } from "../signatures/MethodSignatureModel";
import { StorageValueModel } from "../values/StorageValueModel";
import { MarshallingContext } from "../../marshalling/MarshallingContext";
import { AbstractInstanceMethodCallTransactionRequestModel } from "./AbstractInstanceMethodCallTransactionRequestModel";
import { Signer } from "../../signature/Signer";
/**
 * A request for calling an instance method of a storage object in a node.
 */
export declare class InstanceMethodCallTransactionRequestModel extends AbstractInstanceMethodCallTransactionRequestModel {
    /**
     * The chain identifier where this request can be executed, to forbid transaction replay across chains.
     */
    chainId: string;
    /**
     * The signature of the request.
     */
    signature: string;
    /**
     * A request for calling an instance method of a storage object in a node.
     * It builds the transaction request.
     * @param caller the externally owned caller contract that pays for the transaction
     * @param nonce the nonce used for transaction ordering and to forbid transaction replay; it is relative to the caller
     * @param chainId the chain identifier where this request can be executed, to forbid transaction replay across chains
     * @param gasLimit the maximal amount of gas that can be consumed by the transaction
     * @param gasPrice the coins payed for each unit of gas consumed by the transaction
     * @param classpath the class path where the caller can be interpreted and the code must be executed
     * @param method the method that must be called
     * @param receiver the receiver of the call
     * @param actuals the actual arguments passed to the method
     * @param signer the signer of the request
     * @throws HotmokaException if errors occur
     */
    constructor(caller: StorageReferenceModel, nonce: string, chainId: string, gasLimit: string, gasPrice: string, classpath: TransactionReferenceModel, method: MethodSignatureModel, receiver: StorageReferenceModel, actuals: Array<StorageValueModel>, signer?: Signer);
    /**
     * It marshals this object into a stream.
     * @param context the context holding the stream
     */
    into(context: MarshallingContext): void;
    protected intoWithoutSignature(context: MarshallingContext): void;
}
