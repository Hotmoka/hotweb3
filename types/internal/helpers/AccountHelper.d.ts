/// <reference types="node" />
import { RemoteNode } from "../RemoteNode";
import { Algorithm } from "../signature/Algorithm";
import { KeyPair } from "../bip39/KeyPair";
import { Bip39Dictionary } from "../bip39/Bip39Dictionary";
import { Account } from "../models/Account";
import { StorageReferenceModel } from "../models/values/StorageReferenceModel";
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
     * @param keyPair the key pair of the new account
     * @param balance the balance of the new account
     * @param balanceRed the red balance of the new account
     * @return the an account
     * @throws TransactionRejectedException if the transaction could not be executed
     * @throws CodeExecutionException if the transaction could be executed but led to an exception in the user code in blockchain,
     *                                that is allowed to be thrown by the method
     * @throws TransactionException if the transaction could be executed but led to an exception outside the user code in blockchain,
     *                              or that is not allowed to be thrown by the method
     */
    createAccountFromFaucet(algorithm: Algorithm, keyPair: KeyPair, balance: string, balanceRed: string): Promise<Account>;
    /**
     * It creates a local account without the reference in the store of the remote node.
     * @param keyPair the key pair generated
     * @return a local account
     */
    createLocalAccount(keyPair: KeyPair): Account;
    /**
     * Checks that the given account address is actually an account object in the remote node
     * with the same public key as the account.
     * @param accountAddress the address of the account
     * @param publicKeyToCheck the public key to check encoded in base64
     * @return true if the provided public key is equal to the public key stored in the remote node,
     *              false otherwise
     */
    verifyAccount(accountAddress: StorageReferenceModel, publicKeyToCheck: string): Promise<boolean>;
    /**
     * Creates a {@link KeyPair} from the given password, BIP39 dictionary and entropy.
     * @param password the password
     * @param bip39Dictionary the bip39 dictionary to use. Available options: "english"
     * @param entropy the optional entropy. It will use a random 16 bytes entropy if not provided.
     * @return a {@link KeyPair}
     */
    generateEd25519KeyPairFrom(password: string, bip39Dictionary: Bip39Dictionary, entropy?: Buffer): KeyPair;
    /**
     * Yields the account reconstructed from these BIP39 mnemonic words.
     * This works only if the words were actually derived from an account.
     * @param password the password of the account
     * @param mnemonic the BIP39 mnemonic words
     * @param bip39Dictionary the bi39 dictionary used
     * @return the account
     */
    generateAccountFrom(password: string, mnemonic: string, bip39Dictionary: Bip39Dictionary): Account;
    /**
     * It returns the public key from the remote node of the given account reference.
     * @param reference the reference of the account
     * @return the public key
     */
    private getPublicKey;
}
