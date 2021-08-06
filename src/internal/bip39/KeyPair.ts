export class KeyPair {
    /**
     * Private key encoded in base64.
     */
    public readonly privateKey: string

    /**
     * Public key encoded in base64.
     */
    public readonly publicKey: string

    /**
     * The entropy encoded in hex.
     */
    public readonly entropy: string

    constructor(privateKey: string, publicKey: string, entropy: string) {
        this.privateKey = privateKey
        this.publicKey = publicKey
        this.entropy = entropy
    }
}