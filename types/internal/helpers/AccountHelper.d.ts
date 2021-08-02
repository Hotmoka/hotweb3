import { RemoteNode } from "../RemoteNode";
import { Algorithm } from "../signature/Algorithm";
import { StorageValueModel } from "../models/values/StorageValueModel";
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
    static checkPassword(entropy: string, password: string, publicKeyToCheck: string, privateKeyToCheck: string): boolean;
    /**
     * It generates a 32 bytes entropy.
     * @return the entropy encoded in hex
     */
    static generateEntropy(): string;
    /**
     * Creates a key pair from the given entropy and password.
     * @param entropy random bytes encoded in hex
     * @param password the password
     * @return {{publicKey, privateKey}} the key pair in base64 derived from entropy and password
     */
    static generateEd25519KeyPair(entropy: string, password: string): {
        privateKey: string;
        publicKey: string;
    };
}
