import { Account } from "../models/Account";
import { Bip39Params } from "./Bip39Params";
export declare class Bip39 {
    private readonly dictionary;
    private readonly words;
    /**
     * BIP39 implementation from the given {@link Bip39Params} params.
     * @param params the BIP39 params
     */
    constructor(params: Bip39Params);
    /**
     * It returns the generated mnemonic from the given {@link Bip39Params} params.
     */
    getMnemonic(): string;
    /**
     * It returns the generated account from the given {@link Bip39Params} params.
     * @return the generated account
     */
    getAccount(): Account;
    /**
     * Transforms a sequence of bytes into BIP39 words, including a checksum at its end.
     * @param data the bytes
     */
    private generateWords;
    private static arraysEquals;
}
