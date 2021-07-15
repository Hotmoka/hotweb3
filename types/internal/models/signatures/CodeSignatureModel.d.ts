import { SignatureModel } from "./SignatureModel";
import { MarshallingContext } from "../../marshalling/MarshallingContext";
/**
 * The model of the signature of a field, method or constructor.
 */
export declare abstract class CodeSignatureModel extends SignatureModel {
    /**
     * The name of the class defining the field, method or constructor.
     */
    formals: Array<string>;
    protected constructor(definingClass: string, formals: Array<string>);
    protected equals(other: any): boolean;
    protected into(context: MarshallingContext): void;
    /**
     * Checks if two string arrays are equal and in the same order.
     * @param arr1 the first array
     * @param arr2 the second array
     * @return true if the are equal, false otherwise
     */
    private static arrayEquals;
}
