import { ConstructorCallTransactionResponseModel } from "./ConstructorCallTransactionResponseModel";
import { UpdateModel } from "../updates/UpdateModel";
/**
 * A response for a failed transaction that should have called a constructor
 * of a storage class in blockchain.
 */
export declare class ConstructorCallTransactionFailedResponseModel extends ConstructorCallTransactionResponseModel {
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
    constructor(updates: Array<UpdateModel>, gasConsumedForCPU: string, gasConsumedForRAM: string, gasConsumedForStorage: string, gasConsumedForPenalty: string, classNameOfCause: string, messageOfCause: string, where: string);
}
