import { FieldSignatureModel } from "../signatures/FieldSignatureModel";
import { StorageValueModel } from "../values/StorageValueModel";
import { TransactionReferenceModel } from "../values/TransactionReferenceModel";
import { StorageReferenceModel } from "../values/StorageReferenceModel";
/**
 * An update states that a property of an object has been
 * modified to a given value. Updates are stored in blockchain and
 * describe the shape of storage objects.
 */
export declare class UpdateModel {
    /**
     * The field that is updated. This is null for class tags.
     */
    field: FieldSignatureModel;
    /**
     * The value assigned to the updated field. This is null for class tags.
     */
    value: StorageValueModel;
    /**
     * The name of the class of the object. This is non-null for class tags only.
     */
    className: string;
    /**
     * The transaction that installed the jar from where the class has been loaded.
     * This is non-null for class tags only.
     */
    jar: TransactionReferenceModel;
    /**
     * The object whose field is modified.
     */
    object: StorageReferenceModel;
    constructor(field: FieldSignatureModel, value: StorageValueModel, className: string, jar: TransactionReferenceModel, object: StorageReferenceModel);
}
