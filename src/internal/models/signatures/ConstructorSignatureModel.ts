import {CodeSignatureModel} from "./CodeSignatureModel";
import {MarshallingContext} from "../../marshalling/MarshallingContext";
import {ClassType} from "../../lang/ClassType";
import {Selectors} from "../../marshalling/Selectors";

/**
 * The signature of a constructor of a class.
 */
export class ConstructorSignatureModel extends CodeSignatureModel {
    /**
     * The constructor ExternallyOwnedAccount(BigInteger, String).
     */
    public static readonly EOA_CONSTRUCTOR = new ConstructorSignatureModel(ClassType.EOA.name, [ClassType.BIG_INTEGER.name, ClassType.STRING.name]);

    /**
     * Builds the signature of a constructor.
     * @param definingClass the class of the constructor
     * @param formals the formal arguments of the constructor
     */
    constructor(definingClass: string, formals: Array<string>) {
        super(definingClass, formals)
    }

    public equals(other: any): boolean {
        return other instanceof ConstructorSignatureModel && super.equals(other)
    }

    /**
     * Marshals this object into a stream.
     * @param context the context holding the stream
     */
    public into(context: MarshallingContext): void {
        if (this.equals(ConstructorSignatureModel.EOA_CONSTRUCTOR)) {
            context.writeByte(Selectors.SELECTOR_CONSTRUCTOR_EOA)
        } else {
            context.writeByte(Selectors.SELECTOR_CONSTRUCTOR)
            super.into(context)
        }
    }
}