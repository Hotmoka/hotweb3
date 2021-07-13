import { StorageReferenceModel } from "../values/StorageReferenceModel";
import { TransactionReferenceModel } from "../values/TransactionReferenceModel";
import { MethodSignatureModel } from "../signatures/MethodSignatureModel";
import { StorageValueModel } from "../values/StorageValueModel";
import { MarshallingContext } from "../../marshalling/MarshallingContext";
import { AbstractInstanceMethodCallTransactionRequestModel } from "./AbstractInstanceMethodCallTransactionRequestModel";
import { Signature } from "../../signature/Signature";
export declare class InstanceMethodCallTransactionRequestModel extends AbstractInstanceMethodCallTransactionRequestModel {
    /**
     * The chain identifier where this request can be executed, to forbid transaction replay across chains.
     */
    chainId: string;
    /**
     * The signature of the request.
     */
    signature: string;
    constructor(caller: StorageReferenceModel, nonce: string, classpath: TransactionReferenceModel, gasLimit: string, gasPrice: string, method: MethodSignatureModel, actuals: Array<StorageValueModel>, receiver: StorageReferenceModel, chainId: string, signature?: Signature);
    into(context: MarshallingContext): void;
    protected intoWithoutSignature(context: MarshallingContext): void;
}
