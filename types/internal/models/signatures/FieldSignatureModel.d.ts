import { SignatureModel } from "./SignatureModel";
import { MarshallingContext } from "../../marshalling/MarshallingContext";
/**
 * The model of the signature of a field of a class.
 */
export declare class FieldSignatureModel extends SignatureModel {
    /**
     * The name of the field.
     */
    name: string;
    /**
     * The type of the field.
     */
    type: string;
    constructor(name: string, type: string, definingClass: string);
    into(context: MarshallingContext): void;
}
