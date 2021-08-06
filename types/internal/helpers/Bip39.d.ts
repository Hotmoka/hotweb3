/// <reference types="node" />
import { StorageReferenceModel } from "../models/values/StorageReferenceModel";
export declare class Bip39 {
    private readonly dictionary;
    private readonly words;
    /**
     * Creates the BIP39 words from the given entropy and hash of an account using the given dictionary.
     * @param dictionary the dictionary
     * @param entropy the entropy encoded to HEX
     * @param hashOfTransactionReference the hash of the account encoded to HEX
     */
    constructor(dictionary: string, entropy: string, hashOfTransactionReference?: string);
    /**
     * It returns the generated mnemonic.
     */
    getMnemonic(): string;
    /**
     * It returns the generated account.
     */
    getAccount(): Account;
    /**
     * Transforms a sequence of bytes into BIP39 words, including a checksum at its end.
     * @param data the bytes
     */
    private generateWords;
    static entropyToMnemonic(entropy: Buffer, hashOfTransactionReference: string): Array<string>;
    static mnemonicToEntropy(mnemonic: string): Account;
    private static deriveChecksumBits;
    private static bytesToBinary;
    private static binaryToByte;
    private static lpad;
    static normalize(str: string): string;
    static getDictionary(name: string): Array<string>;
}
export declare class Account {
    readonly entropy: string;
    readonly storageReference: StorageReferenceModel;
    constructor(entropy: string, hashOfTransactionReference: string);
}
