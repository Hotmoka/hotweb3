/// <reference types="node" />
import { RemoteNode } from "../RemoteNode";
import { Algorithm } from "../signature/Algorithm";
import { StorageValueModel } from "../models/values/StorageValueModel";
import { KeyPair } from "../bip39/KeyPair";
import { Bip39Dictionary } from "../bip39/Bip39Dictionary";
import { Account } from "../models/Account";
export declare class AccountHelper {
    private readonly remoteNode;
    private readonly manifestHelper;
    private readonly nonceHelper;
    private readonly gasHelper;
    /**
     * Builds an object that helps with the creation of new accounts.
     * @param remoteNode the remote node
     */
    constructor(remoteNode: RemoteNode);
    /**
     * Creates a new account by letting the faucet pay.
     * @param algorithm the signature algorithm for the new account
     * @param publicKey the public key of the new account
     * @param balance the balance of the new account
     * @param balanceRed the red balance of the new account
     * @return the storage reference of the account
     * @throws TransactionRejectedException if the transaction could not be executed
     * @throws CodeExecutionException if the transaction could be executed but led to an exception in the user code in blockchain,
     *                                that is allowed to be thrown by the method
     * @throws TransactionException if the transaction could be executed but led to an exception outside the user code in blockchain,
     *                              or that is not allowed to be thrown by the method
     */
    createAccountFromFaucet(algorithm: Algorithm, publicKey: string, balance: string, balanceRed: string): Promise<StorageValueModel>;
    /**
     * Checks if the provided public and private key are equal to the public and private key
     * generated from the given entropy and password.
     * @param entropy the entropy encoded in hex
     * @param password the password
     * @param publicKeyToCheck the public key to check encoded in base64
     * @param privateKeyToCheck the private key to check encoded in base64
     * @return true if the provided public and private key are equal to the public and private key generated from the given entropy and password,
     *              false otherwise
     */
    static verifyAccount(entropy: string, password: string, publicKeyToCheck: string, privateKeyToCheck: string): boolean;
    /**
     * Creates a {@link KeyPair} from the given password, BIP39 dictionary and entropy.
     * @param password the password
     * @param bip39Dictionary the bip39 dictionary to use. Available options: "english"
     * @param entropy the optional entropy. It will use a random 16 bytes entropy if not provided.
     * @return a {@link KeyPair}
     */
    static generateEd25519KeyPairFrom(password: string, bip39Dictionary: Bip39Dictionary, entropy?: Buffer): KeyPair;
    /**
     * Yields the account reconstructed from these BIP39 mnemonic words.
     * This works only if the words were actually derived from an account.
     * @param password the password of the account
     * @param mnemonic the BIP39 mnemonic words
     * @param bip39Dictionary the bi39 dictionary used
     * @return the account
     */
    static generateAccountFrom(password: string, mnemonic: string, bip39Dictionary: Bip39Dictionary): Account;
}
