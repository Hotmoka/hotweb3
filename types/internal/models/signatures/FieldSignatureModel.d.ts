import { SignatureModel } from "./SignatureModel";
import { MarshallingContext } from "../../marshalling/MarshallingContext";
/**
 * The signature of a field of a class.
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
    /**
     * Builds the signature of a field.
     * @param definingClass the class of the field
     * @param name the name of the field
     * @param type the type of the field
     * @throws HotmokaException if errors occur
     */
    constructor(definingClass: string, name: string, type: string);
    /**
     * Marshals this object into a stream.
     * @param context the context holding the stream
     */
    into(context: MarshallingContext): void;
}
