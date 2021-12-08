import { Validator } from "./Validator";
import { StorageReferenceModel } from "../values/StorageReferenceModel";
/**
 * The model holding the information of the validators.
 */
export declare class Validators {
    validatorsReference?: StorageReferenceModel;
    validators: Array<Validator>;
    numOfValidators?: string;
    height?: string;
    numberOfTransactions?: string;
    ticketForNewPoll?: string;
    numberOfPolls?: string;
    totalSupply?: string;
    totalSupplyRed?: string;
    constructor(validatorsReference?: StorageReferenceModel, numOfValidators?: string, height?: string, numberOfTransactions?: string, ticketForNewPoll?: string, numberOfPolls?: string, totalSupply?: string, totalSupplyRed?: string);
}
