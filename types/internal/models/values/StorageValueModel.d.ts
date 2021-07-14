import { StorageReferenceModel } from "./StorageReferenceModel";
import { MarshallingContext } from "../../marshalling/MarshallingContext";
/**
 * A value that can be stored in the blockchain, passed as argument to an entry
 * or returned from an entry.
 */
export declare class StorageValueModel {
    /**
     * Used for primitive values, big integers, and strings.
     */
    value?: string;
    /**
     * Used for storage references and null.
     */
    reference?: StorageReferenceModel;
    /**
     * The type of the value. For storage references and null, this is "reference".
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
     * @return a storage value
     */
    static newStorageValue(value: string, type: string): StorageValueModel;
    /**
     * Yields a null reference.
     * @return a null reference storage value
     */
    static newNullReference(): StorageValueModel;
    /**
     * Yields a reference storage value.
     * @param reference the reference
     * @return a reference storage value
     */
    static newReference(reference: StorageReferenceModel): StorageValueModel;
    /**
     * Yields an enum storage value.
     * @param enumElementName the enum name
     * @param type the type of enum
     * @return an enum storage value
     */
    static newEnum(enumElementName: string, type: string): StorageValueModel;
    /**
     * Marshals a storage value object into a stream.
     * @param context the context holding the stream
     * @param storageValue the storage value to marshall
     */
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
