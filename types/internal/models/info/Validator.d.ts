import { StorageReferenceModel } from "../values/StorageReferenceModel";
/**
 * The model holding the information of a validator.
 */
export declare class Validator {
    validator?: StorageReferenceModel;
    id?: string;
    balanceOfValidator?: string;
    power?: string;
    num?: number;
    constructor(validator?: StorageReferenceModel, id?: string, balanceOfValidator?: string, power?: string, num?: number);
}
