import {MethodSignatureModel} from "./MethodSignatureModel";
import {MarshallingContext} from "../../marshalling/MarshallingContext";
import {Selectors} from "../../marshalling/Selectors";
import {BasicType} from "../../lang/BasicType";
import {ClassType} from "../../lang/ClassType";
import {HotmokaException} from "../../exceptions/HotmokaException";

/**
 * The signature of a method of a class, that returns a value.
 */
export class NonVoidMethodSignatureModel extends MethodSignatureModel {

    /**
     * The return type of the method.
     */
    returnType: string

    /**
     * Builds the signature of a method, that returns a value.
     * @param definingClass the class of the method
     * @param methodName the name of the method
     * @param returnType the type of the returned value
     * @param formals the formal arguments of the method
     * @throws HotmokaException if errors occur
     */
    constructor(definingClass: string,
                methodName: string,
                returnType: string,
                formals: Array<string>
    ) {
        super(definingClass, methodName, formals)

        if (!returnType) {
            throw new HotmokaException("Invalid returnType " + returnType)
        }

        this.returnType = returnType
    }

    /**
     * Marshals this object into a stream.
     * @param context the context holding the stream
     */
    public into(context: MarshallingContext): void {
        context.writeByte(Selectors.SELECTOR_NON_VOID_METHOD)
        super.into(context)
        if (BasicType.isBasicType(this.returnType)) {
            new BasicType(this.returnType).into(context)
        } else {
            new ClassType(this.returnType).into(context)
        }
    }
}