import { MethodSignatureModel } from "./MethodSignatureModel";
import { MarshallingContext } from "../../marshalling/MarshallingContext";
/**
 * The signature of a method of a class, that does not return any value.
 */
export declare class VoidMethodSignatureModel extends MethodSignatureModel {
    /**
     * The method "reward" of the validators contract.
     */
    static readonly VALIDATORS_REWARD: VoidMethodSignatureModel;
    /**
     * Builds the signature of a void method.
     * @param definingClass the class of the method
     * @param methodName the name of the method
     * @param formals the formal arguments of the method
     * @throws HotmokaException if errors occur
     */
    constructor(definingClass: string, methodName: string, formals: Array<string>);
    equals(other: any): boolean;
    /**
     * Marshals this object into a stream.
     * @param context the context holding the stream
     */
    into(context: MarshallingContext): void;
}
