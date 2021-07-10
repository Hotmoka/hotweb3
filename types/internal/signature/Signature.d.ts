import { Algorithm } from "./Algorithm";
import { eddsa } from "elliptic";
export declare class Signature {
    /**
     * The algorithm of the signatures.
     */
    readonly algorithm: Algorithm;
    /**
     * The private key.
     * @private
     */
    readonly privateKey: eddsa.KeyPair;
    /**
     * It constructs a signature object to sign the requests.
     * @param algorithm the algorithm
     * @param privateKey the raw key encoded in base64 or wrapped in a PEM format
     */
    constructor(algorithm: Algorithm, privateKey: string);
    private static isPemFormat;
}
