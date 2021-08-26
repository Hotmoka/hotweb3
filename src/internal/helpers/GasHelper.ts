import {RemoteNode} from "../RemoteNode";
import {InstanceMethodCallTransactionRequestModel} from "../models/requests/InstanceMethodCallTransactionRequestModel";
import {CodeSignature} from "../lang/CodeSignature";
import {StorageReferenceModel} from "../models/values/StorageReferenceModel";
import {HotmokaException} from "../exceptions/HotmokaException";
import {TransactionReferenceModel} from "../models/values/TransactionReferenceModel";


export class GasHelper {
    private static readonly GAS_LIMIT = "100000"
    private readonly remoteNode: RemoteNode

    constructor(remoteNode: RemoteNode) {
        this.remoteNode = remoteNode
    }

    /**
     * Yields the gasStation.
     * @private
     * @return the gasStation
     */
    private async getGasStation(): Promise<GasStationResult> {
        const takamakaCode = await this.remoteNode.getTakamakaCode()
        const manifest = await this.remoteNode.getManifest()
        const gasStation = await this.remoteNode.runInstanceMethodCallTransaction(new InstanceMethodCallTransactionRequestModel(
            manifest,
            "0",
            "",
            GasHelper.GAS_LIMIT,
            "0",
            takamakaCode,
            CodeSignature.GET_GAS_STATION,
            manifest,
            []
        ))

        if (!gasStation.reference) {
            throw new HotmokaException('Unexpected returned gas station reference')
        }

        return {
            takamakaCode: takamakaCode,
            manifest: manifest,
            gasStation: gasStation.reference
        } as GasStationResult
    }

    /**
     * Yields the gas price for a transaction.
     * @return the gas price
     * @throws TransactionRejectedException if the transaction could not be executed
     * @throws CodeExecutionException if the transaction could be executed but led to an exception in the user code in blockchain,
     *                                that is allowed to be thrown by the method
     * @throws TransactionException if the transaction could be executed but led to an exception outside the user code in blockchain,
     *                              or that is not allowed to be thrown by the method
     * @throws HotmokaException if generic errors occur
     */
    public async getGasPrice(): Promise<string> {
        const {takamakaCode, manifest, gasStation} = await this.getGasStation()

        const ignoresGasPrice = await this.remoteNode.runInstanceMethodCallTransaction(new InstanceMethodCallTransactionRequestModel(
            manifest,
            "0",
            "",
            GasHelper.GAS_LIMIT,
            "0",
            takamakaCode,
            CodeSignature.IGNORES_GAS_PRICE,
            gasStation,
            []
        ))

        if (ignoresGasPrice.value && ignoresGasPrice.value === 'true') {
            return Promise.resolve('1')
        }

        const gasPrice = await this.remoteNode.runInstanceMethodCallTransaction(new InstanceMethodCallTransactionRequestModel(
            manifest,
            "0",
            "",
            GasHelper.GAS_LIMIT,
            "0",
            takamakaCode,
            CodeSignature.GET_GAS_PRICE,
            gasStation,
            []
        ))

        return (gasPrice && gasPrice.value) ?? '1'
    }
}

interface GasStationResult {
    takamakaCode: TransactionReferenceModel,
    manifest: StorageReferenceModel,
    gasStation: StorageReferenceModel
}