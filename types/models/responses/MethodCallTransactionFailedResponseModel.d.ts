import { MethodCallTransactionResponseModel } from "./MethodCallTransactionResponseModel";
import { UpdateModel } from "../updates/UpdateModel";
export declare class MethodCallTransactionFailedResponseModel extends MethodCallTransactionResponseModel {
    /**
     * The amount of gas consumed by the transaction as penalty for the failure.
     */
    gasConsumedForPenalty: string;
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
    constructor(updates: Array<UpdateModel>, gasConsumedForCPU: string, gasConsumedForRAM: string, gasConsumedForStorage: string, selfCharged: boolean, gasConsumedForPenalty: string, classNameOfCause: string, messageOfCause: string, where: string);
}
