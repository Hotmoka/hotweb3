import {StorageReferenceModel} from "../values/StorageReferenceModel";
import {Validator} from "./Validator";

export class InitialValidators {
    validatorsReference?: StorageReferenceModel
    validators?: Array<Validator>
    numberOfInitialValidators = 0

    constructor(validatorsReference?: StorageReferenceModel, validators?: Array<Validator>) {
        this.validatorsReference = validatorsReference
        this.validators = validators
        this.numberOfInitialValidators = validators?.length ?? 0
    }

}