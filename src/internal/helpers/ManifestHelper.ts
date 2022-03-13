import {InfoModel} from "../models/info/InfoModel";
import {RemoteNode} from "../RemoteNode";
import {InstanceMethodCallTransactionRequestModel} from "../models/requests/InstanceMethodCallTransactionRequestModel";
import {StorageReferenceModel} from "../models/values/StorageReferenceModel";
import {TransactionReferenceModel} from "../models/values/TransactionReferenceModel";
import {CodeSignature} from "../lang/CodeSignature";
import {HotmokaException} from "../exceptions/HotmokaException";
import {MethodSignatureModel} from "../models/signatures/MethodSignatureModel";
import {GameteInfo} from "../models/info/GameteInfo";
import {GasStation} from "../models/info/GasStation";
import {NonVoidMethodSignatureModel} from "../models/signatures/NonVoidMethodSignatureModel";
import {ClassType} from "../lang/ClassType";
import {BasicType} from "../lang/BasicType";
import {Validators} from "../models/info/Validators";
import {Validator} from "../models/info/Validator";
import {StorageValueModel} from "../models/values/StorageValueModel";
import {InitialValidators} from "../models/info/InitialValidators";

/**
 * Helper class to get information about the remote Hotmoka node.
 */
export class ManifestHelper {
    private readonly remoteNode: RemoteNode

    constructor(remoteNode: RemoteNode) {
        this.remoteNode = remoteNode
    }

    /**
     * Checks if the remote node allows an unsigned faucet.
     * @return true if the remote node allows an unsigned faucet false otherwise
     * @throws TransactionRejectedException if the transaction could not be executed
     * @throws CodeExecutionException if the transaction could be executed but led to an exception in the user code in blockchain,
     *                                that is allowed to be thrown by the method
     * @throws TransactionException if the transaction could be executed but led to an exception outside the user code in blockchain,
     *                              or that is not allowed to be thrown by the method
     * @throws HotmokaException if generic errors occur
     */
    async allowsUnsignedFaucet(): Promise<boolean> {
        const takamakaCode = await this.remoteNode.getTakamakaCode()
        const manifest = await this.remoteNode.getManifest()
        const allowsUnsignedFaucet = await this.remoteNode.runInstanceMethodCallTransaction(this.buildInstanceMethodCallTransactionModel(manifest, takamakaCode, CodeSignature.ALLOWS_UNSIGNED_FAUCET, manifest))
        return (allowsUnsignedFaucet && allowsUnsignedFaucet.value) ? 'true' === allowsUnsignedFaucet.value : false
    }

    /**
     * Yields the chainId of the remote node.
     * @return the storage reference of the gamete
     * @throws TransactionRejectedException if the transaction could not be executed
     * @throws CodeExecutionException if the transaction could be executed but led to an exception in the user code in blockchain,
     *                                that is allowed to be thrown by the method
     * @throws TransactionException if the transaction could be executed but led to an exception outside the user code in blockchain,
     *                              or that is not allowed to be thrown by the method
     * @throws HotmokaException if generic errors occur
     */
    async getChainId(): Promise<string> {
        const takamakaCode = await this.remoteNode.getTakamakaCode()
        const manifest = await this.remoteNode.getManifest()
        const chainId = await this.remoteNode.runInstanceMethodCallTransaction(this.buildInstanceMethodCallTransactionModel(manifest, takamakaCode, CodeSignature.GET_CHAIN_ID, manifest))

        if (chainId && chainId.value) {
            return chainId.value
        } else {
            throw new HotmokaException("Unable to retrieve the chainId")
        }
    }

    /**
     * Yields the gamete of the remote node.
     * @return the storage reference of the gamete
     * @throws TransactionRejectedException if the transaction could not be executed
     * @throws CodeExecutionException if the transaction could be executed but led to an exception in the user code in blockchain,
     *                                that is allowed to be thrown by the method
     * @throws TransactionException if the transaction could be executed but led to an exception outside the user code in blockchain,
     *                              or that is not allowed to be thrown by the method
     * @throws HotmokaException if generic errors occur
     */
    async getGamete(): Promise<StorageReferenceModel> {
        const takamakaCode = await this.remoteNode.getTakamakaCode()
        const manifest = await this.remoteNode.getManifest()
        const gamete = await this.remoteNode.runInstanceMethodCallTransaction(this.buildInstanceMethodCallTransactionModel(manifest, takamakaCode, CodeSignature.GET_GAMETE, manifest))

        if (gamete && gamete.reference) {
            return gamete.reference
        } else {
            throw new HotmokaException("Unable to retrieve the gamete")
        }
    }

    /**
     * Yields the info of a remote node.
     * @return the info of the node
     * @throws TransactionRejectedException if the transaction could not be executed
     * @throws CodeExecutionException if the transaction could be executed but led to an exception in the user code in blockchain,
     *                                that is allowed to be thrown by the method
     * @throws TransactionException if the transaction could be executed but led to an exception outside the user code in blockchain,
     *                              or that is not allowed to be thrown by the method
     * @throws HotmokaException if generic errors occur
     */
    async info(): Promise<InfoModel> {
        const takamakaCode = await this.remoteNode.getTakamakaCode()
        const manifest = await this.remoteNode.getManifest()

        if (!takamakaCode) {
            throw new HotmokaException("TakamakaCode not found")
        }

        if (!manifest) {
            throw new HotmokaException("Manifest not found")
        }

        const validators = await this.remoteNode.runInstanceMethodCallTransaction(this.buildInstanceMethodCallTransactionModel(manifest, takamakaCode, CodeSignature.GET_VALIDATORS, manifest))
        const gasStation = await this.remoteNode.runInstanceMethodCallTransaction(this.buildInstanceMethodCallTransactionModel(manifest, takamakaCode, CodeSignature.GET_GAS_STATION, manifest))
        const versions = await this.remoteNode.runInstanceMethodCallTransaction(this.buildInstanceMethodCallTransactionModel(manifest, takamakaCode, CodeSignature.GET_VERSIONS, manifest))
        const gamete = await this.remoteNode.runInstanceMethodCallTransaction(this.buildInstanceMethodCallTransactionModel(manifest, takamakaCode, CodeSignature.GET_GAMETE, manifest))
        const accountsLedger = await this.remoteNode.runInstanceMethodCallTransaction(this.buildInstanceMethodCallTransactionModel(manifest, takamakaCode, CodeSignature.GET_ACCOUNTS_LEDGER, manifest))

        if (!gamete.reference) {
            throw new HotmokaException("Gamete not found")
        }

        if (!gasStation.reference) {
            throw new HotmokaException("GasStation not found")
        }

        if (!validators.reference) {
            throw new HotmokaException("Validators not found")
        }

        if (!versions.reference) {
            throw new HotmokaException("Versions not found")
        }

        if (!accountsLedger.reference) {
            throw new HotmokaException("Accounts Ledger not found")
        }

        const chainId = await this.remoteNode.runInstanceMethodCallTransaction(this.buildInstanceMethodCallTransactionModel(manifest, takamakaCode, CodeSignature.GET_CHAIN_ID, manifest))
        const verificationVersion = await this.remoteNode.runInstanceMethodCallTransaction(this.buildInstanceMethodCallTransactionModel(manifest, takamakaCode, CodeSignature.GET_VERIFICATION_VERSION, versions.reference))
        const maxErrorLength = await this.remoteNode.runInstanceMethodCallTransaction(this.buildInstanceMethodCallTransactionModel(manifest, takamakaCode, CodeSignature.GET_MAX_ERROR_LENGTH, manifest))
        const maxDependencies = await this.remoteNode.runInstanceMethodCallTransaction(this.buildInstanceMethodCallTransactionModel(manifest, takamakaCode, CodeSignature.GET_MAX_DEPENDENCIES, manifest))
        const maxCumulativeSizeOfDependencies = await this.remoteNode.runInstanceMethodCallTransaction(this.buildInstanceMethodCallTransactionModel(gamete.reference, takamakaCode, CodeSignature.GET_MAX_CUMULATIVE_SIZE_OF_DEPENDENCIES, manifest))
        const allowsSelfCharged = await this.remoteNode.runInstanceMethodCallTransaction(this.buildInstanceMethodCallTransactionModel(manifest, takamakaCode, CodeSignature.ALLOWS_SELF_CHARGED, manifest))
        const allowsUnsignedFaucet = await this.remoteNode.runInstanceMethodCallTransaction(this.buildInstanceMethodCallTransactionModel(manifest, takamakaCode, CodeSignature.ALLOWS_UNSIGNED_FAUCET, manifest))
        const allowsMintBurnFromGamete = await this.remoteNode.runInstanceMethodCallTransaction(this.buildInstanceMethodCallTransactionModel(manifest, takamakaCode, CodeSignature.ALLOWS_MINT_BURN_FROM_GAMETE, manifest))
        const skipsVerification = await this.remoteNode.runInstanceMethodCallTransaction(this.buildInstanceMethodCallTransactionModel(manifest, takamakaCode, CodeSignature.SKIPS_VERIFICATION, manifest))
        const signature = await this.remoteNode.runInstanceMethodCallTransaction(this.buildInstanceMethodCallTransactionModel(manifest, takamakaCode, CodeSignature.GET_SIGNATURE, manifest))

        // gamete info
        const balanceOfGamete = await this.remoteNode.runInstanceMethodCallTransaction(this.buildInstanceMethodCallTransactionModel(manifest, takamakaCode, CodeSignature.BALANCE, gamete.reference))
        const redBalanceOfGamete = await this.remoteNode.runInstanceMethodCallTransaction(this.buildInstanceMethodCallTransactionModel(manifest, takamakaCode, CodeSignature.BALANCE_RED, gamete.reference))
        const maxFaucet = await this.remoteNode.runInstanceMethodCallTransaction(this.buildInstanceMethodCallTransactionModel(manifest, takamakaCode, CodeSignature.GET_MAX_FAUCET, gamete.reference))
        const maxRedFaucet = await this.remoteNode.runInstanceMethodCallTransaction(this.buildInstanceMethodCallTransactionModel(manifest, takamakaCode, CodeSignature.GET_MAX_RED_FAUCET, gamete.reference))

        // gasStation info
        const gasPrice = await this.remoteNode.runInstanceMethodCallTransaction(this.buildInstanceMethodCallTransactionModel(manifest, takamakaCode, CodeSignature.GET_GAS_PRICE, gasStation.reference))
        const maxGasPerTransaction = await this.remoteNode.runInstanceMethodCallTransaction(this.buildInstanceMethodCallTransactionModel(manifest, takamakaCode, CodeSignature.GET_MAX_GAS_PER_TRANSACTION, gasStation.reference))
        const ignoresGasPrice = await this.remoteNode.runInstanceMethodCallTransaction(this.buildInstanceMethodCallTransactionModel(manifest, takamakaCode, CodeSignature.IGNORES_GAS_PRICE, gasStation.reference))
        const targetGasAtReward = await this.remoteNode.runInstanceMethodCallTransaction(this.buildInstanceMethodCallTransactionModel(manifest, takamakaCode, CodeSignature.GET_TARGET_GAS_AT_REWARD, gasStation.reference))
        const oblivion = await this.remoteNode.runInstanceMethodCallTransaction(this.buildInstanceMethodCallTransactionModel(manifest, takamakaCode, CodeSignature.GET_OBLIVION, gasStation.reference))
        const initialGasPrice = await this.remoteNode.runInstanceMethodCallTransaction(this.buildInstanceMethodCallTransactionModel(manifest, takamakaCode, CodeSignature.GET_INITIAL_GAS_PRICE, gasStation.reference))

        // validators
        const shares = await this.remoteNode.runInstanceMethodCallTransaction(this.buildInstanceMethodCallTransactionModel(manifest, takamakaCode, new NonVoidMethodSignatureModel(ClassType.VALIDATORS.name, "getShares", ClassType.STORAGE_MAP.name,  []), validators.reference))
        if (!shares.reference) {
            throw new HotmokaException("Shares not found")
        }
        const numOfValidators = await this.remoteNode.runInstanceMethodCallTransaction(this.buildInstanceMethodCallTransactionModel(manifest, takamakaCode, new NonVoidMethodSignatureModel(ClassType.STORAGE_MAP.name, "size", BasicType.INT.name,[]), shares.reference))
        const height = await this.remoteNode.runInstanceMethodCallTransaction(this.buildInstanceMethodCallTransactionModel(manifest, takamakaCode, CodeSignature.GET_HEIGHT, validators.reference))
        const numberOfTransactions = await this.remoteNode.runInstanceMethodCallTransaction(this.buildInstanceMethodCallTransactionModel(manifest, takamakaCode, CodeSignature.GET_NUMBER_OF_TRANSACTIONS, validators.reference))
        const ticketForNewPoll = await this.remoteNode.runInstanceMethodCallTransaction(this.buildInstanceMethodCallTransactionModel(manifest, takamakaCode, CodeSignature.GET_TICKET_FOR_NEW_POLL, validators.reference))
        const polls = await this.remoteNode.runInstanceMethodCallTransaction(this.buildInstanceMethodCallTransactionModel(manifest, takamakaCode, CodeSignature.GET_POLLS, validators.reference))
        const initialSupply = await this.remoteNode.runInstanceMethodCallTransaction(this.buildInstanceMethodCallTransactionModel(manifest, takamakaCode, CodeSignature.GET_INITIAL_SUPPLY, validators.reference))
        const currentSupply = await this.remoteNode.runInstanceMethodCallTransaction(this.buildInstanceMethodCallTransactionModel(manifest, takamakaCode, CodeSignature.GET_CURRENT_SUPPLY, validators.reference))
        const finalSupply = await this.remoteNode.runInstanceMethodCallTransaction(this.buildInstanceMethodCallTransactionModel(manifest, takamakaCode, CodeSignature.GET_FINAL_SUPPLY, validators.reference))
        const initialRedSupply = await this.remoteNode.runInstanceMethodCallTransaction(this.buildInstanceMethodCallTransactionModel(manifest, takamakaCode, CodeSignature.GET_INITIAL_RED_SUPPLY, validators.reference))
        const initialInflation = await this.remoteNode.runInstanceMethodCallTransaction(this.buildInstanceMethodCallTransactionModel(manifest, takamakaCode, CodeSignature.GET_INITIAL_INFLATION, validators.reference))
        const currentInflation = await this.remoteNode.runInstanceMethodCallTransaction(this.buildInstanceMethodCallTransactionModel(manifest, takamakaCode, CodeSignature.GET_CURRENT_INFLATION, validators.reference))

        const offers = await this.remoteNode.runInstanceMethodCallTransaction(this.buildInstanceMethodCallTransactionModel(
            manifest, takamakaCode, new NonVoidMethodSignatureModel(ClassType.SHARED_ENTITY.name, "getOffers", ClassType.STORAGE_SET_VIEW.name, []), validators.reference
            ))
        const numOfOffers = await this.remoteNode.runInstanceMethodCallTransaction(this.buildInstanceMethodCallTransactionModel(
            manifest, takamakaCode, new NonVoidMethodSignatureModel(ClassType.STORAGE_SET_VIEW.name, "size", BasicType.INT.name, []), offers.reference!
        ))

        const buyerSurcharge = await this.remoteNode.runInstanceMethodCallTransaction(this.buildInstanceMethodCallTransactionModel(
            manifest, takamakaCode, new NonVoidMethodSignatureModel(ClassType.VALIDATORS.name, "getBuyerSurcharge", BasicType.INT.name, []), validators.reference
        ))
        const slashingForMisbehaving = await this.remoteNode.runInstanceMethodCallTransaction(this.buildInstanceMethodCallTransactionModel(
            manifest, takamakaCode, new NonVoidMethodSignatureModel(ClassType.VALIDATORS.name, "getSlashingForMisbehaving", BasicType.INT.name, []), validators.reference
        ))
        const slashingForNotBehaving = await this.remoteNode.runInstanceMethodCallTransaction(this.buildInstanceMethodCallTransactionModel(
            manifest, takamakaCode, new NonVoidMethodSignatureModel(ClassType.VALIDATORS.name, "getSlashingForNotBehaving", BasicType.INT.name, []), validators.reference
        ))
        const percentStaked = await this.remoteNode.runInstanceMethodCallTransaction(this.buildInstanceMethodCallTransactionModel(
            manifest, takamakaCode, new NonVoidMethodSignatureModel(ClassType.VALIDATORS.name, "getPercentStaked", BasicType.INT.name, []), validators.reference
        ))

        if (!polls.reference) {
            throw new HotmokaException("Polls not found")
        }
        const numOfPolls = await this.remoteNode.runInstanceMethodCallTransaction(this.buildInstanceMethodCallTransactionModel(manifest, takamakaCode, new NonVoidMethodSignatureModel(ClassType.STORAGE_SET_VIEW.name,"size", BasicType.INT.name,[]), polls.reference))

        const info = new InfoModel()
        info.takamakaCode = takamakaCode
        info.manifest = manifest
        info.accountsLedger = accountsLedger.reference
        info.chainId = chainId.value ?? ''
        info.versions = versions.reference
        info.verificationVersion = verificationVersion.value ?? '0'
        info.maxErrorLength = maxErrorLength.value ? Number(maxErrorLength.value) : 0
        info.maxDependencies = maxDependencies.value ? Number(maxDependencies.value) : 0
        info.maxCumulativeSizeOfDependencies = maxCumulativeSizeOfDependencies.value ? Number(maxCumulativeSizeOfDependencies.value) : 0
        info.allowsSelfCharged = allowsSelfCharged.value ? 'true' === allowsSelfCharged.value : false
        info.allowsUnsignedFaucet = allowsUnsignedFaucet.value ? 'true' === allowsUnsignedFaucet.value : false
        info.allowsMintBurnFromGamete = allowsMintBurnFromGamete.value ? 'true' === allowsMintBurnFromGamete.value : false
        info.skipsVerification = skipsVerification.value ? 'true' === skipsVerification.value : false
        info.signature = signature.value ?? ''
        info.gameteInfo = new GameteInfo(gamete.reference, balanceOfGamete.value, redBalanceOfGamete.value, maxFaucet.value, maxRedFaucet.value)
        info.gasStation = new GasStation(gasStation.reference, gasPrice.value, maxGasPerTransaction.value, ignoresGasPrice.value, targetGasAtReward.value, oblivion.value, initialGasPrice.value)
        info.validators = new Validators( {validatorsReference: validators.reference, numOfValidators: numOfValidators.value, height: height.value,
            numberOfTransactions: numberOfTransactions.value, ticketForNewPoll: ticketForNewPoll.value, numberOfPolls: numOfPolls.value,
            initialSupply: initialSupply.value, currentSupply: currentSupply.value, finalSupply: finalSupply.value, initialRedSupply: initialRedSupply.value,
            initialInflation: initialInflation.value, currentInflation: currentInflation.value, buyerSurcharge: buyerSurcharge.value,
            slashingForMisbehaving: slashingForMisbehaving.value, slashingForNotBehaving: slashingForNotBehaving.value, percentStaked: percentStaked.value
        })

        const numOfValidatorsValue = Number(numOfValidators.value) ?? 0
        for (let i = 0; i < numOfValidatorsValue; i++) {
            const validator = await this.getValidator(manifest, takamakaCode, shares.reference, i)
            info.validators.validators.push(validator)
        }

        const initialValidators = await this.remoteNode.runInstanceMethodCallTransaction(this.buildInstanceMethodCallTransactionModel(manifest, takamakaCode, CodeSignature.GET_INITIAL_VALIDATORS, manifest))
        if (initialValidators.reference) {
            const initialValidatorsArray: Array<Validator> = []
            const initialValidatorsShares = await this.remoteNode.runInstanceMethodCallTransaction(this.buildInstanceMethodCallTransactionModel(manifest, takamakaCode,new NonVoidMethodSignatureModel(ClassType.VALIDATORS.name, "getShares", ClassType.STORAGE_MAP.name,  []), initialValidators.reference))
            if (initialValidatorsShares.reference) {
                const numberOfInitialValidators = await this.remoteNode.runInstanceMethodCallTransaction(this.buildInstanceMethodCallTransactionModel(manifest, takamakaCode,new NonVoidMethodSignatureModel(ClassType.STORAGE_MAP_VIEW.name, "size", BasicType.INT.name, []), initialValidatorsShares.reference))
                const numOfInitialValidatorsValue = Number(numberOfInitialValidators.value) ?? 0

                for (let i = 0; i < numOfInitialValidatorsValue; i++) {
                    const validator = await this.getValidator(manifest, takamakaCode, shares.reference, i)
                    initialValidatorsArray.push(validator)
                }

                info.initialValidators = new InitialValidators(initialValidators.reference, initialValidatorsArray)
            }

        }

        return info
    }

    private buildInstanceMethodCallTransactionModel(
        caller: StorageReferenceModel,
        classPath: TransactionReferenceModel,
        methodsSignatureModel: MethodSignatureModel,
        receiver: StorageReferenceModel,
        actuals?: StorageValueModel[]
    ): InstanceMethodCallTransactionRequestModel {
        return new InstanceMethodCallTransactionRequestModel(
            caller,
            "0",
            "",
            "100000",
            "0",
            classPath,
            methodsSignatureModel,
            receiver,
            actuals ?? [],
            this.remoteNode.signer
        )
    }

    private async getValidator(manifest: StorageReferenceModel, takamakaCode: TransactionReferenceModel, shares: StorageReferenceModel, i: number): Promise<Validator> {
        const validator = await this.remoteNode.runInstanceMethodCallTransaction(
            this.buildInstanceMethodCallTransactionModel(
                manifest,
                takamakaCode,
                new NonVoidMethodSignatureModel(ClassType.STORAGE_MAP.name, "select", ClassType.OBJECT.name, [BasicType.INT.name]),
                shares,
                [StorageValueModel.newStorageValue(i + '', BasicType.INT.name)]
            )
        )

        if (!validator.reference) {
            throw new HotmokaException("Validator not found")
        }

        const id = await this.remoteNode.runInstanceMethodCallTransaction(this.buildInstanceMethodCallTransactionModel(manifest, takamakaCode, CodeSignature.ID, validator.reference))
        const balanceOfValidator = await this.remoteNode.runInstanceMethodCallTransaction(this.buildInstanceMethodCallTransactionModel(manifest, takamakaCode, CodeSignature.BALANCE, validator.reference))
       // const staked = await this.remoteNode.runInstanceMethodCallTransaction(this.buildInstanceMethodCallTransactionModel(manifest, takamakaCode, CodeSignature.GET_STAKE, validator.reference, [validator]))
        const power = await this.remoteNode.runInstanceMethodCallTransaction(
            this.buildInstanceMethodCallTransactionModel(
                manifest,
                takamakaCode,
                new NonVoidMethodSignatureModel(ClassType.STORAGE_MAP.name, "get", ClassType.OBJECT.name,[ClassType.OBJECT.name]),
                shares,
                [validator]
            )
        )

        return new Validator(validator.reference, id.value, balanceOfValidator.value, power.value, "0", i)
    }
}