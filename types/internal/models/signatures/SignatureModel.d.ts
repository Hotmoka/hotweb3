/**
 * The model of the signature of a field, method or constructor.
 */
import { Marshallable } from "../../marshalling/Marshallable";
import { MarshallingContext } from "../../marshalling/MarshallingContext";
export declare abstract class SignatureModel extends Marshallable {
    /**
     * The name of the class defining the field, method or constructor.
     */
    definingClass: string;
    protected constructor(definingClass: string);
    protected into(context: MarshallingContext): void;
}
