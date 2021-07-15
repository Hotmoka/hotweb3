import { ConstructorSignatureModel } from "../signatures/ConstructorSignatureModel";
import { StorageReferenceModel } from "../values/StorageReferenceModel";
import { TransactionReferenceModel } from "../values/TransactionReferenceModel";
import { StorageValueModel } from "../values/StorageValueModel";
import { MarshallingContext } from "../../marshalling/MarshallingContext";
import { CodeExecutionTransactionRequestModel } from "./CodeExecutionTransactionRequestModel";
import { Signer } from "../../signature/Signer";
/**
 * A request for calling a constructor of a storage class in a node.
 */
export declare class ConstructorCallTransactionRequestModel extends CodeExecutionTransactionRequestModel {
    /**
     * The signature of the constructor to call.
     */
    constructorSignature: ConstructorSignatureModel;
    /**
     * The chain identifier where this request can be executed, to forbid transaction replay across chains.
     */
    chainId: string;
    /**
     * The signature of the request.
     */
    signature: string;
    /**
     * A request for calling a constructor of a storage class in a node.
     * It builds the transaction request.
     * @param caller the externally owned caller contract that pays for the transaction
     * @param nonce the nonce used for transaction ordering and to forbid transaction replay; it is relative to the caller
     * @param chainId the chain identifier where this request can be executed, to forbid transaction replay across chains
     * @param gasLimit the maximal amount of gas that can be consumed by the transaction
     * @param gasPrice the coins payed for each unit of gas consumed by the transaction
     * @param classpath the class path where the caller can be interpreted and the code must be executed
     * @param constructorSignature the signature of constructor that must be called
     * @param actuals the actual arguments passed to the constructor
     * @param signer the optional signer of the request
     * @throws HotmokaException if errors occur
     */
    constructor(caller: StorageReferenceModel, nonce: string, chainId: string, gasLimit: string, gasPrice: string, classpath: TransactionReferenceModel, constructorSignature: ConstructorSignatureModel, actuals: Array<StorageValueModel>, signer?: Signer);
    /**
     * It marshals this object into a stream.
     * @param context hte context holding the stream
     */
    into(context: MarshallingContext): void;
    protected intoWithoutSignature(context: MarshallingContext): void;
}
