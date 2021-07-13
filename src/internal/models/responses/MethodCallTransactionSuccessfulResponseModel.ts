import {MethodCallTransactionResponseModel} from "./MethodCallTransactionResponseModel";
import {StorageValueModel} from "../values/StorageValueModel";
import {StorageReferenceModel} from "../values/StorageReferenceModel";
import {UpdateModel} from "../updates/UpdateModel";

export class MethodCallTransactionSuccessfulResponseModel extends MethodCallTransactionResponseModel {
    /**
     * The return value of the method.
     */
    result: StorageValueModel

    /**
     * The events generated by this transaction.
     */
    events: Array<StorageReferenceModel>

    constructor(
        updates: Array<UpdateModel>,
        gasConsumedForCPU: string,
        gasConsumedForRAM: string,
        gasConsumedForStorage: string,
        selfCharged: boolean,
        result: StorageValueModel,
        events: Array<StorageReferenceModel>
    ) {
        super(updates, gasConsumedForCPU, gasConsumedForRAM, gasConsumedForStorage, selfCharged)
        this.result = result
        this.events = events
    }
}