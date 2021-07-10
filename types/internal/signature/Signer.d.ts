/// <reference types="node" />
import { Signature } from "./Signature";
export declare class Signer {
    static readonly INSTANCE: Signer;
    private constructor();
    /**
     * Signs the data.
     * @param signature the signature with which to sign the data
     * @param data the data
     * @return the signed data as a base64 string
     */
    sign(signature: Signature, data: Buffer): string;
}
