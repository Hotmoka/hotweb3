import { RemoteNode } from "../RemoteNode";
import { StorageReferenceModel } from "../models/values/StorageReferenceModel";
import { KeyPair } from "../bip39/KeyPair";
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
     */
    fromPayer(payer: StorageReferenceModel, keysOfPayer: KeyPair, destination: StorageReferenceModel, amount: string, amountRed: string): Promise<void>;
    /**
     * Sends coins to an account, by letting the faucet of the node pay.
     * @param destination the destination account
     * @param amount the balance to transfer
     * @param amountRed the red balance to transfer
     */
    fromFaucet(destination: StorageReferenceModel, amount: string, amountRed: string): Promise<void>;
    private sendCoins;
}
