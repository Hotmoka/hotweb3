import {Buffer} from "buffer";
import {Algorithm} from "./Algorithm";
import {HotmokaException} from "../exceptions/HotmokaException";
import {eddsa} from "elliptic";

/**
 * The signer of a transaction request.
 */
export class Signer {
    /**
     * The algorithm of the signatures.
     */
    public readonly algorithm: Algorithm

    /**
     * The private key.
     */
    public readonly privateKey: eddsa.KeyPair

    /**
     * Builds a signer to sign the transaction requests.
     * @param algorithm the algorithm
     * @param privateKey the raw key encoded in base64 or wrapped in PEM format
     * @throws HotmokaException if errors occur
     */
    constructor(algorithm: Algorithm, privateKey: string) {

        if (algorithm === Algorithm.SHA256DSA) {
            throw new HotmokaException("Signature algorithm not implemented")
        } else if (algorithm == Algorithm.ED25519) {
            this.algorithm = algorithm

            if (!privateKey) {
                throw new HotmokaException("Private key not initialized")
            }

            let key = privateKey
            if (Signer.isPemFormat(key)) {
                const splitted = key.split("\n")
                if (splitted.length > 1) {
                    key = splitted[1].trim()
                }
            }

            const ec = new eddsa('ed25519')
            this.privateKey = ec.keyFromSecret(Buffer.from(key, 'base64'))

        } else {
            throw new HotmokaException("Signature algorithm not recognized")
        }
    }

    /**
     * Signs the data for a transaction request.
     * @param data the data
     * @return the signed data as a base64 string
     */
    public sign(data: Buffer): string {

        if (!this.privateKey) {
            throw new HotmokaException("Private key not initialized")
        }

        if (this.algorithm === Algorithm.ED25519) {
            const signedBytes = this.privateKey.sign(data).toBytes()
            return Buffer.from(signedBytes).toString('base64')
        } else {
            throw new HotmokaException("Signature algorithm not implemented")
        }
    }

    private static isPemFormat(key: string): boolean {
        return key.trim().startsWith("-----") && key.trim().endsWith("-----")
    }
}
