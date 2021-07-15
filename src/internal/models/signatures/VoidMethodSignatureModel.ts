import {MethodSignatureModel} from "./MethodSignatureModel";
import {MarshallingContext} from "../../marshalling/MarshallingContext";
import {ClassType} from "../../lang/ClassType";
import {Selectors} from "../../marshalling/Selectors";


/**
 * The signature of a method of a class, that does not return any value.
 */
export class VoidMethodSignatureModel extends MethodSignatureModel {
    /**
     * The method "reward" of the validators contract.
     */
    public static readonly VALIDATORS_REWARD = new VoidMethodSignatureModel(ClassType.VALIDATORS.name, "reward", [ClassType.BIG_INTEGER.name, ClassType.STRING.name, ClassType.STRING.name, ClassType.BIG_INTEGER.name, ClassType.BIG_INTEGER.name])

    /**
     * Builds the signature of a void method.
     * @param definingClass the class of the method
     * @param methodName the name of the method
     * @param formals the formal arguments of the method
     * @throws HotmokaException if errors occur
     */
    constructor(definingClass: string, methodName: string, formals: Array<string>) {
        super(definingClass, methodName, formals)
    }

    public equals(other: any): boolean {
        return other instanceof VoidMethodSignatureModel && super.equals(other)
    }

    /**
     * Marshals this object into a stream.
     * @param context the context holding the stream
     */
    public into(context: MarshallingContext): void {
        if (this.equals(VoidMethodSignatureModel.VALIDATORS_REWARD)) {
            context.writeByte(Selectors.SELECTOR_REWARD)
        } else {
            context.writeByte(Selectors.SELECTOR_VOID_METHOD)
            super.into(context)
        }
    }
}