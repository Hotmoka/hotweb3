import { StorageReferenceModel } from "../values/StorageReferenceModel";
import { TransactionReferenceModel } from "../values/TransactionReferenceModel";
import { TransactionRequestModel } from "./TransactionRequestModel";
import { MarshallingContext } from "../../marshalling/MarshallingContext";
export declare abstract class NonInitialTransactionRequestModel extends TransactionRequestModel {
    caller: StorageReferenceModel;
    nonce: string;
    classpath: TransactionReferenceModel;
    gasLimit: string;
    gasPrice: string;
    protected constructor(caller: StorageReferenceModel, nonce: string, classpath: TransactionReferenceModel, gasLimit: string, gasPrice: string);
    protected intoWithoutSignature(context: MarshallingContext): void;
}
