import { NonInitialTransactionRequestModel } from "./NonInitialTransactionRequestModel";
import { MarshallingContext } from "../../internal/marshalling/MarshallingContext";
import { StorageValueModel } from "../values/StorageValueModel";
import { StorageReferenceModel } from "../values/StorageReferenceModel";
import { TransactionReferenceModel } from "../values/TransactionReferenceModel";
export declare abstract class CodeExecutionTransactionRequestModel extends NonInitialTransactionRequestModel {
    /**
     * The actual arguments passed to the method.
     */
    actuals: Array<StorageValueModel>;
    protected constructor(caller: StorageReferenceModel, nonce: string, classpath: TransactionReferenceModel, gasLimit: string, gasPrice: string, actuals: Array<StorageValueModel>);
    protected intoWithoutSignature(context: MarshallingContext): void;
}
