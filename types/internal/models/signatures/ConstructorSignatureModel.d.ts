import { CodeSignatureModel } from "./CodeSignatureModel";
import { MarshallingContext } from "../../marshalling/MarshallingContext";
/**
 * The signature of a constructor of a class.
 */
export declare class ConstructorSignatureModel extends CodeSignatureModel {
    /**
     * The constructor ExternallyOwnedAccount(BigInteger, String).
     */
    static readonly EOA_CONSTRUCTOR: ConstructorSignatureModel;
    /**
     * Builds the signature of a constructor.
     * @param definingClass the class of the constructor
     * @param formals the formal arguments of the constructor
     */
    constructor(definingClass: string, formals: Array<string>);
    equals(other: any): boolean;
    /**
     * Marshals this object into a stream.
     * @param context the context holding the stream
     */
    into(context: MarshallingContext): void;
}
