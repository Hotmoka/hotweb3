/// <reference types="node" />
import { Algorithm } from "./Algorithm";
import { eddsa } from "elliptic";
/**
 * The signer of a transaction request.
 */
export declare class Signer {
    /**
     * The algorithm of the signatures.
     */
    readonly algorithm: Algorithm;
    /**
     * The private key.
     */
    readonly privateKey: eddsa.KeyPair;
    /**
     * Builds a signer to sign the transaction requests.
     * @param algorithm the algorithm
     * @param privateKey the raw key encoded in base64 or wrapped in PEM format
     * @throws HotmokaException if errors occur
     */
    constructor(algorithm: Algorithm, privateKey: string);
    /**
     * Signs the data for a transaction request.
     * @param data the data
     * @return the signed data as a base64 string
     */
    sign(data: Buffer): string;
    private static isPemFormat;
}
