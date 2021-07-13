import { StorageReferenceModel } from "./StorageReferenceModel";
import { MarshallingContext } from "../../marshalling/MarshallingContext";
/**
 * The model of a storage value.
 */
export declare class StorageValueModel {
    /**
     * Used for primitive values, big integers, strings and null.
     * For the null value, this field holds exactly null, not the string "null".
     */
    value?: string;
    /**
     * Used for storage references.
     */
    reference?: StorageReferenceModel;
    /**
     * The type of the value. For storage references and {@code null}, this is {@code "reference"}.
     */
    type?: string;
    /**
     * Used for enumeration values only: it is the name of the element in the enumeration.
     */
    enumElementName?: string;
    constructor(value?: string, reference?: StorageReferenceModel, type?: string, enumElementName?: string);
    /**
     * Yields a storage value.
     * @param value the value
     * @param type the type of the value
     */
    static newStorageValue(value: string, type: string): StorageValueModel;
    /**
     * Yields a reference storage value.
     * @param reference the reference
     */
    static newReference(reference: StorageReferenceModel): StorageValueModel;
    /**
     * Yields an enum storage value.
     * @param enumElementName the enum name
     * @param type the type of enum
     */
    static newEnum(enumElementName: string, type: string): StorageValueModel;
    static into(context: MarshallingContext, storageValue: StorageValueModel): void;
    /**
     * Marshals an array of storage values into a given stream.
     * @param storageValues the array of storage values
     * @param context the context holding the stream
     */
    static intoArray(storageValues: Array<StorageValueModel>, context: MarshallingContext): void;
    private static writeBasicType;
    private static writeString;
    private static writeBigInteger;
    private static writeNull;
    private static writeEnum;
}
