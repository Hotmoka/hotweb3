import { MethodSignatureModel } from "./MethodSignatureModel";
import { MarshallingContext } from "../../marshalling/MarshallingContext";
/**
 * The signature of a method of a class, that returns a value.
 */
export declare class NonVoidMethodSignatureModel extends MethodSignatureModel {
    /**
     * The return type of the method.
     */
    returnType: string;
    /**
     * Builds the signature of a method, that returns a value.
     * @param definingClass the class of the method
     * @param methodName the name of the method
     * @param returnType the type of the returned value
     * @param formals the formal arguments of the method
     * @throws HotmokaException if errors occur
     */
    constructor(definingClass: string, methodName: string, returnType: string, formals: Array<string>);
    /**
     * Marshals this object into a stream.
     * @param context the context holding the stream
     */
    into(context: MarshallingContext): void;
}
