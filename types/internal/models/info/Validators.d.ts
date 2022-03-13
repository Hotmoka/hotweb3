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
    initialSupply?: string;
    currentSupply?: string;
    finalSupply?: string;
    initialRedSupply?: string;
    initialInflation?: string;
    initialInflationInfo?: string;
    currentInflation?: string;
    currentInflationInfo?: string;
    buyerSurcharge?: string;
    buyerSurchargeInfo?: string;
    slashingForMisbehaving?: string;
    slashingForMisbehavingInfo?: string;
    slashingForNotBehaving?: string;
    slashingForNotBehavingInfo?: string;
    percentStaked?: string;
    percentStakedInfo?: string;
    constructor(args: any);
}
