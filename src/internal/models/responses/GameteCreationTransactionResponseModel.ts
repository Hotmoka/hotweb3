import {TransactionResponseModel} from "./TransactionResponseModel";
import {UpdateModel} from "../updates/UpdateModel";
import {StorageReferenceModel} from "../values/StorageReferenceModel";

/**
 * A response for a transaction that installs a jar in a yet not initialized blockchain.
 */
export class GameteCreationTransactionResponseModel extends TransactionResponseModel {
    /**
     * The updates resulting from the execution of the transaction.
     */
    updates: Array<UpdateModel>

    /**
     * The created gamete.
     */
    gamete: StorageReferenceModel

    constructor(updates: Array<UpdateModel>, gamete: StorageReferenceModel) {
        super()
        this.updates = updates
        this.gamete = gamete
    }
}