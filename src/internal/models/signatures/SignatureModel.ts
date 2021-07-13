/**
 * The model of the signature of a field, method or constructor.
 */
import {Marshallable} from "../../marshalling/Marshallable";
import {MarshallingContext} from "../../marshalling/MarshallingContext";
import {ClassType} from "../../lang/ClassType";
import {HotmokaException} from "../../exception/HotmokaException";

export abstract class SignatureModel extends Marshallable {
    /**
     * The name of the class defining the field, method or constructor.
     */
    definingClass: string

    protected constructor(definingClass: string) {
        super()

        if (!definingClass) {
            throw new HotmokaException("Invalid definingClass " + definingClass)
        }

        this.definingClass = definingClass
    }

    protected into(context: MarshallingContext): void {
        new ClassType(this.definingClass).into(context)
    }
}