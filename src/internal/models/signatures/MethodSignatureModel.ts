import {CodeSignatureModel} from "./CodeSignatureModel";
import {MarshallingContext} from "../../marshalling/MarshallingContext";
import {HotmokaException} from "../../exceptions/HotmokaException";

/**
 * The signature of a method of a class.
 */
export abstract class MethodSignatureModel extends CodeSignatureModel {
    /**
     * The name of the method.
     */
    methodName: string

    /**
     * Builds the signature of a method.
     * @param definingClass the class of the method
     * @param methodName the name of the method
     * @param formals the formal arguments of the method
     * @throws HotmokaException if errors occur
     */
    protected constructor(definingClass: string, methodName: string, formals: Array<string>) {
        super(definingClass, formals)

        if (!methodName) {
            throw new HotmokaException("Invalid methodName " + methodName)
        }

        this.methodName = methodName
    }

    public equals(other: any): boolean {
        return other instanceof MethodSignatureModel &&
            (other as MethodSignatureModel).methodName === this.methodName &&
            super.equals(other)
    }

    /**
     * Marshals this object into a stream.
     * @param context the context holding the stream
     */
    public into(context: MarshallingContext): void {
        super.into(context)
        context.writeString(this.methodName)
    }
}