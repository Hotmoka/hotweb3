import { CodeSignatureModel } from "./CodeSignatureModel";
import { MarshallingContext } from "../../internal/marshalling/MarshallingContext";
/**
 * The model of the signature of a constructor of a class.
 */
export declare class ConstructorSignatureModel extends CodeSignatureModel {
    /**
     * The constructor ExternallyOwnedAccount(BigInteger, String).
     */
    static readonly EOA_CONSTRUCTOR: ConstructorSignatureModel;
    constructor(definingClass: string, formals: Array<string>);
    equals(other: any): boolean;
    into(context: MarshallingContext): void;
}
