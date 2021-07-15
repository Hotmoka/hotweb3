import {SignatureModel} from "./SignatureModel";
import {MarshallingContext} from "../../marshalling/MarshallingContext";
import {ClassType} from "../../lang/ClassType";
import {BasicType} from "../../lang/BasicType";
import {HotmokaException} from "../../exception/HotmokaException";

/**
 * The signature of a field of a class.
 */
export class FieldSignatureModel extends SignatureModel {

    /**
     * The name of the field.
     */
    name: string

    /**
     * The type of the field.
     */
    type: string

    /**
     * Builds the signature of a field.
     * @param definingClass the class of the field
     * @param name the name of the field
     * @param type the type of the field
     * @throws HotmokaException if errors occur
     */
    constructor(definingClass: string, name: string, type: string) {
        super(definingClass)

        if (!name) {
            throw new HotmokaException("Invalid field name " + name)
        }

        if (!type) {
            throw new HotmokaException("Invalid field type " + type)
        }

        this.name = name
        this.type = type
    }

    /**
     * Marshals this object into a stream.
     * @param context the context holding the stream
     */
    public into(context: MarshallingContext): void {
        super.into(context)
        context.writeString(this.name)

        if (BasicType.isBasicType(this.type)) {
            new BasicType(this.type).into(context)
        } else {
            new ClassType(this.type).into(context)
        }
    }
}