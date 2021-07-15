import { CodeExecutionTransactionResponseModel } from "./CodeExecutionTransactionResponseModel";
import { UpdateModel } from "../updates/UpdateModel";
/**
 * A response for a transaction that should call a method in blockchain.
 */
export declare abstract class MethodCallTransactionResponseModel extends CodeExecutionTransactionResponseModel {
    /**
     * True if and only if the call was charged to the receiver of the target method
     * rather than to the caller of the transaction.
     */
    selfCharged: boolean;
    protected constructor(updates: Array<UpdateModel>, gasConsumedForCPU: string, gasConsumedForRAM: string, gasConsumedForStorage: string, selfCharged: boolean);
}
