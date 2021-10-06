import { RemoteNode } from "../RemoteNode";
import { StorageReferenceModel } from "../models/values/StorageReferenceModel";
import { KeyPair } from "../bip39/KeyPair";
import { TransactionReferenceModel } from "../models/values/TransactionReferenceModel";
export declare class SendCoinsHelper {
    private static readonly _100_000;
    private readonly remoteNode;
    /**
     * Builds an object that helps with sending coins to accounts.
     * @param remoteNode the remote node
     */
    constructor(remoteNode: RemoteNode);
    /**
     * Sends coins to an account, by letting another account pay.
     * @param payer the sender of the coins
     * @param keysOfPayer the keys of the {@code payer}
     * @param destination the destination account
     * @param amount the balance to transfer
     * @param amountRed the red balance to transfer
     * @param resultTransactionsCallback a function to consume the result transactions of this request
     * @return {Promise<void>} a promise that resolves to void
     * @throws TransactionRejectedException if the transaction could not be executed
     * @throws CodeExecutionException if the transaction could be executed but led to an exception in the user code in blockchain,
     *                                that is allowed to be thrown by the method
     * @throws TransactionException if the transaction could be executed but led to an exception outside the user code in blockchain,
     *                              or that is not allowed to be thrown by the method
     */
    fromPayer(payer: StorageReferenceModel, keysOfPayer: KeyPair, destination: StorageReferenceModel, amount: string, amountRed: string, resultTransactionsCallback?: (resultTransactions: TransactionReferenceModel[]) => void): Promise<void>;
    /**
     * Sends coins to an account, by letting the faucet of the node pay.
     * @param destination the destination account
     * @param amount the balance to transfer
     * @param amountRed the red balance to transfer
     * @param resultTransactionCallback a function to consume the result transaction of this request
     * @return {Promise<void>} a promise that resolves to void
     * @throws TransactionRejectedException if the transaction could not be executed
     * @throws CodeExecutionException if the transaction could be executed but led to an exception in the user code in blockchain,
     *                                that is allowed to be thrown by the method
     * @throws TransactionException if the transaction could be executed but led to an exception outside the user code in blockchain,
     *                              or that is not allowed to be thrown by the method
     */
    fromFaucet(destination: StorageReferenceModel, amount: string, amountRed: string, resultTransactionCallback?: (resultTransaction: TransactionReferenceModel | null) => void): Promise<void>;
}
