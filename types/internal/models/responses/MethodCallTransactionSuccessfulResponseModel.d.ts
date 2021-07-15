import { MethodCallTransactionResponseModel } from "./MethodCallTransactionResponseModel";
import { StorageValueModel } from "../values/StorageValueModel";
import { StorageReferenceModel } from "../values/StorageReferenceModel";
import { UpdateModel } from "../updates/UpdateModel";
/**
 * A response for a successful transaction that calls a method
 * in blockchain. The method has been called without problems and
 * without generating exceptions. The method does not return {@code void}.
 */
export declare class MethodCallTransactionSuccessfulResponseModel extends MethodCallTransactionResponseModel {
    /**
     * The return value of the method.
     */
    result: StorageValueModel;
    /**
     * The events generated by this transaction.
     */
    events: Array<StorageReferenceModel>;
    constructor(updates: Array<UpdateModel>, gasConsumedForCPU: string, gasConsumedForRAM: string, gasConsumedForStorage: string, selfCharged: boolean, result: StorageValueModel, events: Array<StorageReferenceModel>);
}
