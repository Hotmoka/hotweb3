import { MethodCallTransactionResponseModel } from "./MethodCallTransactionResponseModel";
import { StorageReferenceModel } from "../values/StorageReferenceModel";
import { UpdateModel } from "../updates/UpdateModel";
export declare class VoidMethodCallTransactionSuccessfulResponseModel extends MethodCallTransactionResponseModel {
    /**
     * The events generated by this transaction.
     */
    events: Array<StorageReferenceModel>;
    constructor(updates: Array<UpdateModel>, gasConsumedForCPU: string, gasConsumedForRAM: string, gasConsumedForStorage: string, selfCharged: boolean, events: Array<StorageReferenceModel>);
}