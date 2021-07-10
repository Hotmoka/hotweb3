import { MethodSignatureModel } from "./MethodSignatureModel";
import { MarshallingContext } from "../../internal/marshalling/MarshallingContext";
export declare class NonVoidMethodSignatureModel extends MethodSignatureModel {
    /**
     * The return type of the method.
     */
    returnType: string;
    constructor(methodName: string, definingClass: string, formals: Array<string>, returnType: string);
    into(context: MarshallingContext): void;
}
