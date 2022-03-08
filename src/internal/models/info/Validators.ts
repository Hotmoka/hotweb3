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
    initialSupply?: string
    currentSupply?: string
    finalSupply?: string
    initialRedSupply?: string
    initialInflation?: string
    initialInflationInfo?: string
    currentInflation?: string
    currentInflationInfo?: string
    buyerSurcharge?: string
    buyerSurchargeInfo?: string
    slashingForMisbehaving?: string
    slashingForMisbehavingInfo?: string
    slashingForNotBehaving?: string
    slashingForNotBehavingInfo?: string
    percentStaked?: string
    percentStakedInfo?: string

    constructor(args: any) {
        this.validatorsReference = args.validatorsReference
        this.numOfValidators = args.numOfValidators ?? '0'
        this.height = args.height ?? '0'
        this.numberOfTransactions = args.numberOfTransactions ?? '0'
        this.ticketForNewPoll = args.ticketForNewPoll ?? '0'
        this.numberOfPolls = args.numberOfPolls ?? '0'
        this.initialSupply = args.initialSupply ?? '0'
        this.currentSupply = args.currentSupply ?? '0'
        this.finalSupply = args.finalSupply ?? '0'
        this.initialRedSupply = args.initialRedSupply ?? '0'
        this.initialInflation = args.initialInflation ?? '0'
        this.initialInflationInfo = this.initialInflation !== '0' ? (Number(this.initialInflation) / 1000000).toFixed(6) + '%' : ''
        this.currentInflation = args.currentInflation ?? '0'
        this.currentInflationInfo = this.currentInflation !== '0' ? (Number(this.currentInflation) / 1000000).toFixed(6) + '%' : ''
        this.buyerSurcharge = args.buyerSurcharge ?? '0'
        this.buyerSurchargeInfo = this.buyerSurcharge !== '0' ? (Number(this.buyerSurcharge) / 1000000).toFixed(6) + '%' : ''
        this.slashingForMisbehaving = args.slashingForMisbehaving ?? '0'
        this.slashingForMisbehavingInfo = this.slashingForMisbehaving !== '0' ? (Number(this.slashingForMisbehaving) / 1000000).toFixed(6) + '%' : ''
        this.slashingForNotBehaving = args.slashingForNotBehaving ?? '0'
        this.slashingForNotBehavingInfo = this.slashingForNotBehaving !== '0' ? (Number(this.slashingForNotBehaving) / 1000000).toFixed(6) + '%' : ''
        this.percentStaked = args.percentStaked ?? '0'
        this.percentStakedInfo = this.percentStaked !== '0' ? (Number(this.percentStaked) / 1000000).toFixed(6) + '%' : ''
    }
}