import { VoidMethodSignatureModel } from "../../models/signatures/VoidMethodSignatureModel";
import { NonVoidMethodSignatureModel } from "../../models/signatures/NonVoidMethodSignatureModel";
export declare class CodeSignature {
    /**
     * The method {@code receive} of a payable contract, with an int argument.
     */
    static readonly RECEIVE_INT: VoidMethodSignatureModel;
    /**
     * The method {@code receive} of a payable contract, with a long argument.
     */
    static readonly RECEIVE_LONG: VoidMethodSignatureModel;
    /**
     * The method {@code receive} of a payable contract, with a big integer argument.
     */
    static readonly RECEIVE_BIG_INTEGER: VoidMethodSignatureModel;
    /**
     * The method {@code getGamete} of the manifest.
     */
    static readonly GET_GAMETE: NonVoidMethodSignatureModel;
    /**
     * The method {@code nonce} of an account.
     */
    static readonly NONCE: NonVoidMethodSignatureModel;
    /**
     * The method {@code getGasStation} of the manifest.
     */
    static readonly GET_GAS_STATION: NonVoidMethodSignatureModel;
    /**
     * The method {@code getGasPrice} of the gas station.
     */
    static readonly GET_GAS_PRICE: NonVoidMethodSignatureModel;
    /**
     * The method {@code ignoresGasPrice} of the gas station.
     */
    static readonly IGNORES_GAS_PRICE: NonVoidMethodSignatureModel;
    /**
     * The method {@code getChainId} of the manifest.
     */
    static readonly GET_CHAIN_ID: NonVoidMethodSignatureModel;
    /**
     * The method {@code getMaxErrorLength} of the manifest.
     */
    static readonly GET_MAX_ERROR_LENGTH: NonVoidMethodSignatureModel;
    /**
     * The method {@code getMaxDependencies} of the manifest.
     */
    static readonly GET_MAX_DEPENDENCIES: NonVoidMethodSignatureModel;
    /**
     * The method {@code getMaxCumulativeSizeOfDependencies} of the manifest.
     */
    static readonly GET_MAX_CUMULATIVE_SIZE_OF_DEPENDENCIES: NonVoidMethodSignatureModel;
    /**
     * The method {@code allowsSelfCharged} of the manifest.
     */
    static readonly ALLOWS_SELF_CHARGED: NonVoidMethodSignatureModel;
    /**
     * The method {@code allowsUnsignedFaucet} of the manifest.
     */
    static readonly ALLOWS_UNSIGNED_FAUCET: NonVoidMethodSignatureModel;
    /**
     * The method {@code skipsVerification} of the manifest.
     */
    static readonly SKIPS_VERIFICATION: NonVoidMethodSignatureModel;
    /**
     * The method {@code getSignature} of the manifest.
     */
    static readonly GET_SIGNATURE: NonVoidMethodSignatureModel;
    /**
     * The method {@code balance} of a contract.
     */
    static readonly BALANCE: NonVoidMethodSignatureModel;
    /**
     * The method {@code balanceRed} of a contract.
     */
    static readonly BALANCE_RED: NonVoidMethodSignatureModel;
    /**
     * The method {@code getMaxFaucet} of the gamete.
     */
    static readonly GET_MAX_FAUCET: NonVoidMethodSignatureModel;
    /**
     * The method {@code getMaxRedFaucet} of the gamete.
     */
    static readonly GET_MAX_RED_FAUCET: NonVoidMethodSignatureModel;
    /**
     * The method {@code getValidators} of the manifest.
     */
    static readonly GET_VALIDATORS: NonVoidMethodSignatureModel;
    /**
     * The method {@code getVersions} of the manifest.
     */
    static readonly GET_VERSIONS: NonVoidMethodSignatureModel;
    /**
     * The method {@code getMaxGasPerTransaction} of the gas station.
     */
    static readonly GET_MAX_GAS_PER_TRANSACTION: NonVoidMethodSignatureModel;
    /**
     * The method {@code getTargetGasAtReward} of the gas station.
     */
    static readonly GET_TARGET_GAS_AT_REWARD: NonVoidMethodSignatureModel;
    /**
     * The method {@code getInflation} of the gas station.
     */
    static readonly GET_INFLATION: NonVoidMethodSignatureModel;
    /**
     * The method {@code getOblivion} of the gas station.
     */
    static readonly GET_OBLIVION: NonVoidMethodSignatureModel;
    /**
     * The method {@code getHeight} of the manifest.
     */
    static readonly GET_HEIGHT: NonVoidMethodSignatureModel;
    /**
     * The method {@code getNumberOfTransactions} of the manifest.
     */
    static readonly GET_NUMBER_OF_TRANSACTIONS: NonVoidMethodSignatureModel;
    /**
     * The method {@code getTicketForNewPoll} of the manifest.
     */
    static readonly GET_TICKET_FOR_NEW_POLL: NonVoidMethodSignatureModel;
    /**
     * The method {@code getPolls} of the validators object.
     */
    static readonly GET_POLLS: NonVoidMethodSignatureModel;
    /**
     * The method {@code getVerificationVersion} of the versions object.
     */
    static readonly GET_VERIFICATION_VERSION: NonVoidMethodSignatureModel;
    /**
     * The method {@code id} of a validator.
     */
    static readonly ID: NonVoidMethodSignatureModel;
}
