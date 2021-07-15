import { CodeSignatureModel } from "./CodeSignatureModel";
import { MarshallingContext } from "../../marshalling/MarshallingContext";
/**
 * The signature of a method of a class.
 */
export declare abstract class MethodSignatureModel extends CodeSignatureModel {
    /**
     * The name of the method.
     */
    methodName: string;
    /**
     * Builds the signature of a method.
     * @param definingClass the class of the method
     * @param methodName the name of the method
     * @param formals the formal arguments of the method
     * @throws HotmokaException if errors occur
     */
    protected constructor(definingClass: string, methodName: string, formals: Array<string>);
    equals(other: any): boolean;
    /**
     * Marshals this object into a stream.
     * @param context the context holding the stream
     */
    into(context: MarshallingContext): void;
}
