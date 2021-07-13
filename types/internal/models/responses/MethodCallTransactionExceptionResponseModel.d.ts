import { MethodCallTransactionResponseModel } from "./MethodCallTransactionResponseModel";
import { StorageReferenceModel } from "../values/StorageReferenceModel";
import { UpdateModel } from "../updates/UpdateModel";
export declare class MethodCallTransactionExceptionResponseModel extends MethodCallTransactionResponseModel {
    /**
     * The events generated by this transaction.
     */
    events: Array<StorageReferenceModel>;
    /**
     * The fully-qualified class name of the cause exception.
     */
    classNameOfCause: string;
    /**
     * The message of the cause exception.
     */
    messageOfCause: string;
    /**
     * The program point where the cause exception occurred.
     */
    where: string;
    constructor(updates: Array<UpdateModel>, gasConsumedForCPU: string, gasConsumedForRAM: string, gasConsumedForStorage: string, selfCharged: boolean, events: Array<StorageReferenceModel>, classNameOfCause: string, messageOfCause: string, where: string);
}