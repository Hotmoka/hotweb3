export declare class KeyPair {
    /**
     * Private key encoded in base64.
     */
    readonly privateKey: string;
    /**
     * Public key encoded in base64.
     */
    readonly publicKey: string;
    /**
     * The entropy encoded in hex.
     */
    readonly entropy: string;
    constructor(privateKey: string, publicKey: string, entropy: string);
}
