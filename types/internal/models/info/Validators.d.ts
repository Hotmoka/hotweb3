import { Validator } from "./Validator";
import { StorageReferenceModel } from "../values/StorageReferenceModel";
export declare class Validators {
    validatorsReference?: StorageReferenceModel;
    validators: Array<Validator>;
    numOfValidators?: string;
    height?: string;
    numberOfTransactions?: string;
    ticketForNewPoll?: string;
    numberOfPolls?: string;
    constructor(validatorsReference?: StorageReferenceModel, numOfValidators?: string, height?: string, numberOfTransactions?: string, ticketForNewPoll?: string, numberOfPolls?: string);
}
