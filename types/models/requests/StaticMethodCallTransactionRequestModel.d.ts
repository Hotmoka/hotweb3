import { MethodCallTransactionRequestModel } from "./MethodCallTransactionRequestModel";
import { StorageReferenceModel } from "../values/StorageReferenceModel";
import { TransactionReferenceModel } from "../values/TransactionReferenceModel";
import { MethodSignatureModel } from "../signatures/MethodSignatureModel";
import { StorageValueModel } from "../values/StorageValueModel";
import { MarshallingContext } from "../../internal/marshalling/MarshallingContext";
import { Signature } from "../../internal/signature/Signature";
export declare class StaticMethodCallTransactionRequestModel extends MethodCallTransactionRequestModel {
    chainId: string;
    signature: string;
    constructor(caller: StorageReferenceModel, nonce: string, classpath: TransactionReferenceModel, gasLimit: string, gasPrice: string, method: MethodSignatureModel, actuals: Array<StorageValueModel>, chainId: string, signature?: Signature);
    into(context: MarshallingContext): void;
    protected intoWithoutSignature(context: MarshallingContext): void;
}
