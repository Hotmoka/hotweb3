import { StorageReferenceModel } from "../values/StorageReferenceModel";
import { TransactionReferenceModel } from "../values/TransactionReferenceModel";
import { MethodSignatureModel } from "../signatures/MethodSignatureModel";
import { StorageValueModel } from "../values/StorageValueModel";
import { MarshallingContext } from "../../marshalling/MarshallingContext";
import { AbstractInstanceMethodCallTransactionRequestModel } from "./AbstractInstanceMethodCallTransactionRequestModel";
/**
 * A request for calling an instance method of a storage object in a node.
 * This request is not signed, hence it is only used for calls started by the same
 * node. Users cannot run a transaction from this request.
 */
export declare class InstanceSystemMethodCallTransactionRequestModel extends AbstractInstanceMethodCallTransactionRequestModel {
    /**
     * Builds the transaction request.
     * @param caller the externally owned caller contract that pays for the transaction
     * @param nonce the nonce used for transaction ordering and to forbid transaction replay; it is relative to the {@code caller}
     * @param gasLimit the maximal amount of gas that can be consumed by the transaction
     * @param classpath the class path where the {@code caller} can be interpreted and the code must be executed
     * @param method the method that must be called
     * @param receiver the receiver of the call
     * @param actuals the actual arguments passed to the method
     */
    constructor(caller: StorageReferenceModel, nonce: string, gasLimit: string, classpath: TransactionReferenceModel, method: MethodSignatureModel, receiver: StorageReferenceModel, actuals: Array<StorageValueModel>);
    protected into(context: MarshallingContext): void;
}
