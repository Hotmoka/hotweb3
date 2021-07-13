import { TransactionResponseModel } from "./TransactionResponseModel";
import { UpdateModel } from "../updates/UpdateModel";
import { StorageReferenceModel } from "../values/StorageReferenceModel";
export declare class GameteCreationTransactionResponseModel extends TransactionResponseModel {
    /**
     * The updates resulting from the execution of the transaction.
     */
    updates: Array<UpdateModel>;
    /**
     * The created gamete.
     */
    gamete: StorageReferenceModel;
    constructor(updates: Array<UpdateModel>, gamete: StorageReferenceModel);
}
