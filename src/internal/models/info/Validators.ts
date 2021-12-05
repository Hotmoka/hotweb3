import {Validator} from "./Validator";
import {StorageReferenceModel} from "../values/StorageReferenceModel";

/**
 * The model holding the information of the validators.
 */
export class Validators {
    validatorsReference?: StorageReferenceModel
    validators: Array<Validator> = []
    numOfValidators?: string
    height?: string
    numberOfTransactions?: string
    ticketForNewPoll?: string
    numberOfPolls?: string
    totalSupply?: string
    totalSupplyRed?: string

    constructor(
        validatorsReference?: StorageReferenceModel,
        numOfValidators?: string,
        height?: string,
        numberOfTransactions?: string,
        ticketForNewPoll?: string,
        numberOfPolls?: string,
        totalSupply?: string,
        totalSupplyRed?: string
    ) {
        this.validatorsReference = validatorsReference
        this.numOfValidators = numOfValidators ?? '0'
        this.height = height ?? '0'
        this.numberOfTransactions = numberOfTransactions ?? '0'
        this.ticketForNewPoll = ticketForNewPoll ?? '0'
        this.numberOfPolls = numberOfPolls ?? '0'
        this.totalSupply = totalSupply ?? '0'
        this.totalSupplyRed = totalSupplyRed ?? '0'
    }
}