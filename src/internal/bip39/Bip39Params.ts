import {Bip39Dictionary} from "./Bip39Dictionary";

export interface Bip39Params {
    /**
     * The dictionary to use for BIP39.
     */
    dictionary: Bip39Dictionary

    /**
     * The entropy encoded in HEX used
     * in combination with the hashOfTransactionReference to generate a {@link KeyPair}.
     */
    entropy?: string

    /**
     * The optional hash of an account encoded in HEX used
     * in combination with the entropy to generate a keyPair.
     */
    hashOfTransactionReference?: string

    /**
     * The optional BIP39 mnemonic words used to reconstruct an {@link Account}.
     * The words must be separated by a space.
     */
    mnemonic?: string
}
