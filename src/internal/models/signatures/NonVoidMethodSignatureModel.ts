import {MethodSignatureModel} from "./MethodSignatureModel";
import {MarshallingContext} from "../../marshalling/MarshallingContext";
import {Selectors} from "../../marshalling/Selectors";
import {BasicType} from "../../lang/BasicType";
import {ClassType} from "../../lang/ClassType";
import {HotmokaException} from "../../exception/HotmokaException";

export class NonVoidMethodSignatureModel extends MethodSignatureModel {
    /**
     * The return type of the method.
     */
    returnType: string

    constructor(methodName: string,
                definingClass: string,
                formals: Array<string>,
                returnType: string) {
        super(methodName, definingClass, formals)

        if (!returnType) {
            throw new HotmokaException("Invalid returnType " + returnType)
        }

        this.returnType = returnType
    }

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