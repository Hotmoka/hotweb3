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
     * The method receiveRed of a payable contract, with a big integer argument.
     */
    static readonly RECEIVE_RED_BIG_INTEGER: VoidMethodSignatureModel;
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
     * The method {@code allowsMintBurnFromGamete} of the manifest.
     */
    static readonly ALLOWS_MINT_BURN_FROM_GAMETE: NonVoidMethodSignatureModel;
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
     * The method "getStake" of the validators object.
     */
    static readonly GET_STAKE: NonVoidMethodSignatureModel;
    /**
     * The method "getVersions" of the manifest.
     */
    static readonly GET_VERSIONS: NonVoidMethodSignatureModel;
    /**
     * The method "getMaxGasPerTransaction" of the gas station.
     */
    static readonly GET_MAX_GAS_PER_TRANSACTION: NonVoidMethodSignatureModel;
    /**
     * The method {@code getInitialGasPrice} of the gas station.
     */
    static readonly GET_INITIAL_GAS_PRICE: NonVoidMethodSignatureModel;
    /**
     * The method "getTargetGasAtReward" of the gas station.
     */
    static readonly GET_TARGET_GAS_AT_REWARD: NonVoidMethodSignatureModel;
    /**
    * The method "getInitialValidators" of the manifest.
    */
    static readonly GET_INITIAL_VALIDATORS: NonVoidMethodSignatureModel;
    /**
     * The method "getOblivion" of the gas station.
     */
    static readonly GET_OBLIVION: NonVoidMethodSignatureModel;
    /**
     * The method "getHeight" of the validators.
     */
    static readonly GET_HEIGHT: NonVoidMethodSignatureModel;
    /**
     * The method "getNumberOfTransactions" of the validators.
     */
    static readonly GET_NUMBER_OF_TRANSACTIONS: NonVoidMethodSignatureModel;
    /**
     * The method "getTicketForNewPoll" of the validators.
     */
    static readonly GET_TICKET_FOR_NEW_POLL: NonVoidMethodSignatureModel;
    /**
     * The method "getPolls" of the validators object.
     */
    static readonly GET_POLLS: NonVoidMethodSignatureModel;
    /**
     * The method "reward" of the validators contract.
     */
    static readonly VALIDATORS_REWARD: VoidMethodSignatureModel;
    /**
     * The method "getVerificationVersion" of the versions object.
     */
    static readonly GET_VERIFICATION_VERSION: NonVoidMethodSignatureModel;
    /**
     * The method "id" of a validator.
     */
    static readonly ID: NonVoidMethodSignatureModel;
    /**
     * The method publicKey of an account.
     */
    static readonly PUBLIC_KEY: NonVoidMethodSignatureModel;
    /**
     * The method {@code getAccountsLedger} of the manifest.
     */
    static readonly GET_ACCOUNTS_LEDGER: NonVoidMethodSignatureModel;
    /**
     * The method {@code get} of the accountsLedger.
     */
    static readonly GET_FROM_ACCOUNTS_LEDGER: NonVoidMethodSignatureModel;
    /**
     * The method "getInitialSupply" of the validators object.
     */
    static readonly GET_INITIAL_SUPPLY: NonVoidMethodSignatureModel;
    /**
     * The method "getCurrentSupply" of the validators.
     */
    static readonly GET_CURRENT_SUPPLY: NonVoidMethodSignatureModel;
    /**
     * The method "getFinalSupply" of the validators object.
     */
    static readonly GET_FINAL_SUPPLY: NonVoidMethodSignatureModel;
    /**
     * The method "getInitialRedSupply" of the validators object.
     */
    static readonly GET_INITIAL_RED_SUPPLY: NonVoidMethodSignatureModel;
    /**
     * The method "getInitialInflation" of the validators object.
     */
    static readonly GET_INITIAL_INFLATION: NonVoidMethodSignatureModel;
    /**
     * The method "getCurrentInflation" of the validators object.
     */
    static readonly GET_CURRENT_INFLATION: NonVoidMethodSignatureModel;
}
