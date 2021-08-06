/// <reference types="node" />
import { KeyPair } from "../KeyPair";
import { Bip39Dictionary } from "./Bip39Dictionary";
export declare class KeyPairGenerator {
    /**
     * Creates a {@link KeyPair} from the given password, BIP39 dictionary and entropy
     * @param password the password
     * @param bip39Dictionary the bip39 dictionary to use. Available options: "english"
     * @param entropy the optional entropy. It will use a random 16 bytes entropy if not provided.
     * @return a {@link KeyPair}
     */
    static generateEd25519KeyPair(password: string, bip39Dictionary: Bip39Dictionary, entropy?: Buffer): KeyPair;
    /**
     * It generates a 16 bytes entropy.
     * @return the entropy encoded in hex
     */
    private static generateEntropy;
    private static normalize;
}
