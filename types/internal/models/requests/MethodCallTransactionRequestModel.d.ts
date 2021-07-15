import { MethodSignatureModel } from "../signatures/MethodSignatureModel";
import { StorageValueModel } from "../values/StorageValueModel";
import { StorageReferenceModel } from "../values/StorageReferenceModel";
import { TransactionReferenceModel } from "../values/TransactionReferenceModel";
import { CodeExecutionTransactionRequestModel } from "./CodeExecutionTransactionRequestModel";
import { MarshallingContext } from "../../marshalling/MarshallingContext";
/**
 * The model of a method call transaction request.
 */
export declare abstract class MethodCallTransactionRequestModel extends CodeExecutionTransactionRequestModel {
    method: MethodSignatureModel;
    protected constructor(caller: StorageReferenceModel, nonce: string, classpath: TransactionReferenceModel, gasLimit: string, gasPrice: string, method: MethodSignatureModel, actuals: Array<StorageValueModel>);
    protected intoWithoutSignature(context: MarshallingContext): void;
}
