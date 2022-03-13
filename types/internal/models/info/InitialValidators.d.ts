import { StorageReferenceModel } from "../values/StorageReferenceModel";
import { Validator } from "./Validator";
export declare class InitialValidators {
    validatorsReference?: StorageReferenceModel;
    validators?: Array<Validator>;
    numberOfInitialValidators: number;
    constructor(validatorsReference?: StorageReferenceModel, validators?: Array<Validator>);
}
