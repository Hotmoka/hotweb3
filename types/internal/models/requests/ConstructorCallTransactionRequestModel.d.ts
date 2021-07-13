import { ConstructorSignatureModel } from "../signatures/ConstructorSignatureModel";
import { StorageReferenceModel } from "../values/StorageReferenceModel";
import { TransactionReferenceModel } from "../values/TransactionReferenceModel";
import { StorageValueModel } from "../values/StorageValueModel";
import { MarshallingContext } from "../../marshalling/MarshallingContext";
import { CodeExecutionTransactionRequestModel } from "./CodeExecutionTransactionRequestModel";
import { Signature } from "../../signature/Signature";
export declare class ConstructorCallTransactionRequestModel extends CodeExecutionTransactionRequestModel {
    constructorSignature: ConstructorSignatureModel;
    chainId: string;
    signature: string;
    constructor(caller: StorageReferenceModel, nonce: string, classpath: TransactionReferenceModel, gasLimit: string, gasPrice: string, constructorSignature: ConstructorSignatureModel, actuals: Array<StorageValueModel>, chainId: string, signature?: Signature);
    into(context: MarshallingContext): void;
    protected intoWithoutSignature(context: MarshallingContext): void;
}
