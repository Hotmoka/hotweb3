import {StorageReferenceModel} from "../values/StorageReferenceModel";

/**
 * The model holding the information of the gas station.
 */
export class GasStation {
    gasStation?: StorageReferenceModel
    gasPrice?: string
    maxGasPerTransaction?: string
    ignoresGasPrice?: boolean
    targetGasAtReward?: string
    oblivion?: string
    oblivionInfo: string
    initialGasPrice?: string

    constructor(
        gasStation?: StorageReferenceModel,
        gasPrice?: string,
        maxGasPerTransaction?: string,
        ignoresGasPrice?: string,
        targetGasAtReward?: string,
        oblivion?: string,
        initialGasPrice?: string
        ) {
        this.gasStation = gasStation
        this.gasPrice = gasPrice ?? '0'
        this.maxGasPerTransaction = maxGasPerTransaction ?? '0'
        this.ignoresGasPrice = ignoresGasPrice ? 'true' === ignoresGasPrice : false
        this.targetGasAtReward = targetGasAtReward ?? '0'
        this.oblivion = oblivion ?? '0'
        this.oblivionInfo = this.oblivion !== '0' ? (100.0 * Number(this.oblivion) / 1000000).toFixed(2) + '%' : ''
        this.initialGasPrice = initialGasPrice ?? '0'
    }


}