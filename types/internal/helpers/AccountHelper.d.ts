import { RemoteNode } from "../RemoteNode";
import { Algorithm } from "../signature/Algorithm";
import { KeyPair } from "../bip39/KeyPair";
import { Bip39Dictionary } from "../bip39/Bip39Dictionary";
import { Account } from "../models/Account";
import { StorageReferenceModel } from "../models/values/StorageReferenceModel";
import { TransactionReferenceModel } from "../models/values/TransactionReferenceModel";
export declare class AccountHelper {
    static readonly EXTRA_GAS_FOR_ANONYMOUS = 500000;
    private static readonly _100_000;
    private readonly remoteNode;
    /**
     * Builds an object that helps with the creation of new accounts.
     * @param remoteNode the remote node
     */
    constructor(remoteNode: RemoteNode);
    /**
     * Creates a {@link KeyPair} from the given password, BIP39 dictionary and entropy.
     * @param password the password
     * @param bip39Dictionary the bip39 dictionary to use. Available options: "english"
     * @param entropy the optional entropy encoded in HEX. It will use a random 16 bytes entropy if not provided.
     * @return a {@link KeyPair}
     */
    static generateEd25519KeyPairFrom(password: string, bip39Dictionary: Bip39Dictionary, entropy?: string): KeyPair;
    /**
     * Yields the 36 mnemonic words reconstructed from the given entropy and storage reference of an account.
     * @param entropy the entropy encoded in HEX
     * @param storageReferenceHash the hash of the storage reference of the account
     * @param bip39Dictionary the bi39 dictionary used
     * @return an array with the 36 mnemonic words
     */
    static generateMnemonicWordsFrom(entropy: string, storageReferenceHash: string, bip39Dictionary: Bip39Dictionary): Array<string>;
    /**
     * It creates a key for a local account without the reference in the store of the remote node.
     * @param password the password of the key
     * @param bip39Dictionary the bip39 dictionary to use
     * @return a local account
     */
    static createKey(password: string, bip39Dictionary: Bip39Dictionary): Account;
    /**
     * Checks that the provided public key is equal to a generated public key from a
     * password, entropy and bip39Dictionary.
     * @param password the password
     * @param entropy the entropy
     * @param bip39Dictionary the bip39 dictionary
     * @param publicKeyToCheck the public key provided, encoded in base64
     * @return true if the generated public key is equal to the public key provided, false otherwise
     */
    static verifyPublicKey(password: string, entropy: string, bip39Dictionary: Bip39Dictionary, publicKeyToCheck: string): boolean;
    /**
     * Checks if the provided base58 public key can be decoded to a ed25519 public key.
     * @param base58PublicKey the base58 public key
     * @return true if the provided base58 public key can be decoded to a ed25519 public key, false otherwise
     */
    static isEd25519PublicKey(base58PublicKey: string): boolean;
    /**
     * Creates a new account by letting another account pay.
     * @param algorithm the signature algorithm for the new account
     * @param payer the storage reference of the payer
     * @param keyPairOfPayer the key pair of the payer
     * @param keyPair the key pair of the new account
     * @param balance the balance of the new account
     * @param balanceRed the red balance of the new account
     * @param addToLedger adds the new account to the ledger of the manifest, bound to its {@code publicKey}; if an account already
     *                    exists for {@code publicKey}, that account gets funded with {@code balance} and {@code balanceRed} coins and returned
     * @param resultTransactionsCallback a function to consume the result transactions of this request
     * @return the account
     * @throws TransactionRejectedException if the transaction could not be executed
     * @throws CodeExecutionException if the transaction could be executed but led to an exception in the user code in blockchain,
     *                                that is allowed to be thrown by the method
     * @throws TransactionException if the transaction could be executed but led to an exception outside the user code in blockchain,
     *                              or that is not allowed to be thrown by the method
     */
    createAccountFromPayer(algorithm: Algorithm, payer: StorageReferenceModel, keyPairOfPayer: KeyPair, keyPair: KeyPair, balance: string, balanceRed: string, addToLedger: boolean, resultTransactionsCallback?: (resultTransactions: TransactionReferenceModel[]) => void): Promise<Account>;
    /**
     * Creates a new account by letting the faucet pay.
     * @param algorithm the signature algorithm for the new account
     * @param keyPair the key pair of the new account
     * @param balance the balance of the new account
     * @param balanceRed the red balance of the new account
     * @param resultTransactionCallback a function to consume the result transaction of this request
     * @return the account
     * @throws TransactionRejectedException if the transaction could not be executed
     * @throws CodeExecutionException if the transaction could be executed but led to an exception in the user code in blockchain,
     *                                that is allowed to be thrown by the method
     * @throws TransactionException if the transaction could be executed but led to an exception outside the user code in blockchain,
     *                              or that is not allowed to be thrown by the method
     */
    createAccountFromFaucet(algorithm: Algorithm, keyPair: KeyPair, balance: string, balanceRed: string, resultTransactionCallback?: (resultTransaction: TransactionReferenceModel | null) => void): Promise<Account>;
    /**
     * It imports a Hotmoka account.
     * @param name the name of the account
     * @param mnemonic the mnemonic
     * @param bip39Dictionary the bip39 dictionary to use
     * @param password the password
     */
    importAccount(name: string, mnemonic: string, bip39Dictionary: Bip39Dictionary, password: string): Promise<Account>;
    /**
     * Checks that the given account address is actually an account object in the remote node
     * with the same public key as the account.
     * @param accountAddress the address of the account
     * @param publicKeyToCheck the public key to check encoded in base64
     * @return true if the public key to check is equal to the public key stored in the remote node, false otherwise
     */
    verifyAccount(accountAddress: StorageReferenceModel, publicKeyToCheck: string): Promise<boolean>;
    /**
     * It returns the public key from the remote node of the given account reference.
     * @param reference the reference of the account
     * @return the public key
     */
    getPublicKey(reference: StorageReferenceModel): Promise<string>;
    /**
     * It returns the balance of the given account reference from the remote node.
     * @param reference the reference of the account
     * @return the balance
     */
    getBalance(reference: StorageReferenceModel): Promise<string>;
    /**
     * It returns the signature algorithm of the payer.
     * @param reference the reference of the account of the payer
     * @return the signature algorithm
     * @throws HotmokaException if the signature algorithm of the payer is unmanaged
     */
    getSignatureAlgorithm(reference: StorageReferenceModel): Promise<Algorithm>;
    /**
     * It returns the accounts ledger of the manifest.
     * @param takamakaCode the reference of takamakaCode
     * @return the reference of the accounts ledger
     */
    private getAccountsLedger;
}
