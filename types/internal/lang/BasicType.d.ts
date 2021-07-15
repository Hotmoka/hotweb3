import { Marshallable } from "../marshalling/Marshallable";
import { MarshallingContext } from "../marshalling/MarshallingContext";
/**
 * The basic types of the Takamaka language.
 */
export declare class BasicType extends Marshallable {
    static readonly BOOLEAN: BasicType;
    static readonly BYTE: BasicType;
    static readonly CHAR: BasicType;
    static readonly SHORT: BasicType;
    static readonly INT: BasicType;
    static readonly LONG: BasicType;
    static readonly FLOAT: BasicType;
    static readonly DOUBLE: BasicType;
    /**
     * The name of this basic type.
     */
    readonly name: string;
    /**
     * Builds a basic type of the Takamaka language.
     * @param type the type
     */
    constructor(type: string);
    into(context: MarshallingContext): void;
    /**
     * Returns the selector of this basic type.
     * @return the selector
     */
    private getSelector;
    /**
     * Checks whether a type is a {@link BasicType}
     * @param type the type to check
     * @return true if the type is a BasicType, false otherwise
     */
    static isBasicType(type: string): boolean;
}
