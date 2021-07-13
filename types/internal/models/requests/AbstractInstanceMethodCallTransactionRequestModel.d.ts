import { MethodCallTransactionRequestModel } from "./MethodCallTransactionRequestModel";
import { StorageReferenceModel } from "../values/StorageReferenceModel";
import { TransactionReferenceModel } from "../values/TransactionReferenceModel";
import { MethodSignatureModel } from "../signatures/MethodSignatureModel";
import { StorageValueModel } from "../values/StorageValueModel";
import { MarshallingContext } from "../../marshalling/MarshallingContext";
export declare abstract class AbstractInstanceMethodCallTransactionRequestModel extends MethodCallTransactionRequestModel {
    /**
     * The receiver of the call.
     */
    receiver: StorageReferenceModel;
    protected constructor(caller: StorageReferenceModel, nonce: string, classpath: TransactionReferenceModel, gasLimit: string, gasPrice: string, method: MethodSignatureModel, actuals: Array<StorageValueModel>, receiver: StorageReferenceModel);
    protected intoWithoutSignature(context: MarshallingContext): void;
}
