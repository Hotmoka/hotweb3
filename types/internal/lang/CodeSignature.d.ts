import { VoidMethodSignatureModel } from "../models/signatures/VoidMethodSignatureModel";
import { NonVoidMethodSignatureModel } from "../models/signatures/NonVoidMethodSignatureModel";
/**
 * The signature of a method or constructor.
 */
export declare class CodeSignature {
    /**
     * The method "receive" of a payable contract, with an int argument.
     */
    static readonly RECEIVE_INT: VoidMethodSignatureModel;
    /**
     * The method "receive" of a payable contract, with a long argument.
     */
    static readonly RECEIVE_LONG: VoidMethodSignatureModel;
    /**
     * The method "receive" of a payable contract, with a big integer argument.
     */
    static readonly RECEIVE_BIG_INTEGER: VoidMethodSignatureModel;
    /**
     * The method "getGamete" of the manifest.
     */
    static readonly GET_GAMETE: NonVoidMethodSignatureModel;
    /**
     * The method "nonce" of an account.
     */
    static readonly NONCE: NonVoidMethodSignatureModel;
    /**
     * The method "getGasStation" of the manifest.
     */
    static readonly GET_GAS_STATION: NonVoidMethodSignatureModel;
    /**
     * The method "getGasPrice" of the gas station.
     */
    static readonly GET_GAS_PRICE: NonVoidMethodSignatureModel;
    /**
     * The method "ignoresGasPrice" of the gas station.
     */
    static readonly IGNORES_GAS_PRICE: NonVoidMethodSignatureModel;
    /**
     * The method "getChainId" of the manifest.
     */
    static readonly GET_CHAIN_ID: NonVoidMethodSignatureModel;
    /**
     * The method "getMaxErrorLength" of the manifest.
     */
    static readonly GET_MAX_ERROR_LENGTH: NonVoidMethodSignatureModel;
    /**
     * The method "getMaxDependencies" of the manifest.
     */
    static readonly GET_MAX_DEPENDENCIES: NonVoidMethodSignatureModel;
    /**
     * The method "getMaxCumulativeSizeOfDependencies" of the manifest.
     */
    static readonly GET_MAX_CUMULATIVE_SIZE_OF_DEPENDENCIES: NonVoidMethodSignatureModel;
    /**
     * The method "allowsSelfCharged" of the manifest.
     */
    static readonly ALLOWS_SELF_CHARGED: NonVoidMethodSignatureModel;
    /**
     * The method "allowsUnsignedFaucet" of the manifest.
     */
    static readonly ALLOWS_UNSIGNED_FAUCET: NonVoidMethodSignatureModel;
    /**
     * The method "skipsVerification" of the manifest.
     */
    static readonly SKIPS_VERIFICATION: NonVoidMethodSignatureModel;
    /**
     * The method "getSignature" of the manifest.
     */
    static readonly GET_SIGNATURE: NonVoidMethodSignatureModel;
    /**
     * The method "balance" of a contract.
     */
    static readonly BALANCE: NonVoidMethodSignatureModel;
    /**
     * The method "balanceRed" of a contract.
     */
    static readonly BALANCE_RED: NonVoidMethodSignatureModel;
    /**
     * The method "getMaxFaucet" of the gamete.
     */
    static readonly GET_MAX_FAUCET: NonVoidMethodSignatureModel;
    /**
     * The method "getMaxRedFaucet" of the gamete.
     */
    static readonly GET_MAX_RED_FAUCET: NonVoidMethodSignatureModel;
    /**
     * The method "getValidators" of the manifest.
     */
    static readonly GET_VALIDATORS: NonVoidMethodSignatureModel;
    /**
     * The method "getVersions" of the manifest.
     */
    static readonly GET_VERSIONS: NonVoidMethodSignatureModel;
    /**
     * The method "getMaxGasPerTransaction" of the gas station.
     */
    static readonly GET_MAX_GAS_PER_TRANSACTION: NonVoidMethodSignatureModel;
    /**
     * The method "getTargetGasAtReward" of the gas station.
     */
    static readonly GET_TARGET_GAS_AT_REWARD: NonVoidMethodSignatureModel;
    /**
     * The method "getInflation" of the gas station.
     */
    static readonly GET_INFLATION: NonVoidMethodSignatureModel;
    /**
     * The method "getOblivion" of the gas station.
     */
    static readonly GET_OBLIVION: NonVoidMethodSignatureModel;
    /**
     * The method "getHeight" of the manifest.
     */
    static readonly GET_HEIGHT: NonVoidMethodSignatureModel;
    /**
     * The method "getNumberOfTransactions" of the manifest.
     */
    static readonly GET_NUMBER_OF_TRANSACTIONS: NonVoidMethodSignatureModel;
    /**
     * The method "getTicketForNewPoll" of the manifest.
     */
    static readonly GET_TICKET_FOR_NEW_POLL: NonVoidMethodSignatureModel;
    /**
     * The method "getPolls" of the validators object.
     */
    static readonly GET_POLLS: NonVoidMethodSignatureModel;
    /**
     * The method "getVerificationVersion" of the versions object.
     */
    static readonly GET_VERIFICATION_VERSION: NonVoidMethodSignatureModel;
    /**
     * The method "id" of a validator.
     */
    static readonly ID: NonVoidMethodSignatureModel;
}
