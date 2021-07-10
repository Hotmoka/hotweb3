import { CodeSignatureModel } from "./CodeSignatureModel";
import { MarshallingContext } from "../../internal/marshalling/MarshallingContext";
/**
 * The model of the signature of a method of a class.
 */
export declare abstract class MethodSignatureModel extends CodeSignatureModel {
    /**
     * The name of the method.
     */
    methodName: string;
    constructor(methodName: string, definingClass: string, formals: Array<string>);
    equals(other: any): boolean;
    into(context: MarshallingContext): void;
}
