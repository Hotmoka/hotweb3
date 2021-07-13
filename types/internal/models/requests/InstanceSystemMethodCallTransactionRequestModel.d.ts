import { StorageReferenceModel } from "../values/StorageReferenceModel";
import { TransactionReferenceModel } from "../values/TransactionReferenceModel";
import { MethodSignatureModel } from "../signatures/MethodSignatureModel";
import { StorageValueModel } from "../values/StorageValueModel";
import { MarshallingContext } from "../../marshalling/MarshallingContext";
import { AbstractInstanceMethodCallTransactionRequestModel } from "./AbstractInstanceMethodCallTransactionRequestModel";
export declare class InstanceSystemMethodCallTransactionRequestModel extends AbstractInstanceMethodCallTransactionRequestModel {
    constructor(caller: StorageReferenceModel, nonce: string, classpath: TransactionReferenceModel, gasLimit: string, gasPrice: string, method: MethodSignatureModel, actuals: Array<StorageValueModel>, receiver: StorageReferenceModel);
    protected into(context: MarshallingContext): void;
}
