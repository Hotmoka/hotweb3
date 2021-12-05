import {VoidMethodSignatureModel} from "../models/signatures/VoidMethodSignatureModel";
import {ClassType} from "./ClassType";
import {BasicType} from "./BasicType";
import {NonVoidMethodSignatureModel} from "../models/signatures/NonVoidMethodSignatureModel";

/**
 * The signature of a method or constructor.
 */
export class CodeSignature {
    /**
     * The method "receive" of a payable contract, with an int argument.
     */
    public static readonly RECEIVE_INT = new VoidMethodSignatureModel(ClassType.PAYABLE_CONTRACT.name,"receive",  [BasicType.INT.name])

    /**
     * The method "receive" of a payable contract, with a long argument.
     */
    public static readonly RECEIVE_LONG = new VoidMethodSignatureModel(ClassType.PAYABLE_CONTRACT.name,"receive",[BasicType.LONG.name])

    /**
     * The method "receive" of a payable contract, with a big integer argument.
     */
    public static readonly RECEIVE_BIG_INTEGER = new VoidMethodSignatureModel(ClassType.PAYABLE_CONTRACT.name,"receive",[ClassType.BIG_INTEGER.name])

    /**
     * The method receiveRed of a payable contract, with a big integer argument.
     */
    public static readonly RECEIVE_RED_BIG_INTEGER = new VoidMethodSignatureModel(ClassType.PAYABLE_CONTRACT.name, "receiveRed", [ClassType.BIG_INTEGER.name])

    /**
     * The method "getGamete" of the manifest.
     */
    public static readonly GET_GAMETE = new NonVoidMethodSignatureModel(ClassType.MANIFEST.name, "getGamete", ClassType.GAMETE.name,[])

    /**
     * The method "nonce" of an account.
     */
    public static readonly NONCE = new NonVoidMethodSignatureModel(ClassType.ACCOUNT.name,"nonce", ClassType.BIG_INTEGER.name, [])

    /**
     * The method "getGasStation" of the manifest.
     */
    public static readonly GET_GAS_STATION = new NonVoidMethodSignatureModel(ClassType.MANIFEST.name,"getGasStation", ClassType.GAS_STATION.name,[])

    /**
     * The method "getGasPrice" of the gas station.
     */
    public static readonly GET_GAS_PRICE = new NonVoidMethodSignatureModel(ClassType.GAS_STATION.name,"getGasPrice", ClassType.BIG_INTEGER.name, [])

    /**
     * The method "ignoresGasPrice" of the gas station.
     */
    public static readonly IGNORES_GAS_PRICE = new NonVoidMethodSignatureModel(ClassType.GAS_STATION.name,"ignoresGasPrice", BasicType.BOOLEAN.name, [])

    /**
     * The method "getChainId" of the manifest.
     */
    public static readonly GET_CHAIN_ID = new NonVoidMethodSignatureModel(ClassType.MANIFEST.name,"getChainId", ClassType.STRING.name, [])

    /**
     * The method "getMaxErrorLength" of the manifest.
     */
    public static readonly GET_MAX_ERROR_LENGTH = new NonVoidMethodSignatureModel(ClassType.MANIFEST.name,"getMaxErrorLength", BasicType.INT.name, [])

    /**
     * The method "getMaxDependencies" of the manifest.
     */
    public static readonly GET_MAX_DEPENDENCIES = new NonVoidMethodSignatureModel(ClassType.MANIFEST.name,"getMaxDependencies", BasicType.INT.name,[])

    /**
     * The method "getMaxCumulativeSizeOfDependencies" of the manifest.
     */
    public static readonly GET_MAX_CUMULATIVE_SIZE_OF_DEPENDENCIES = new NonVoidMethodSignatureModel(ClassType.MANIFEST.name, "getMaxCumulativeSizeOfDependencies", BasicType.LONG.name,[])

    /**
     * The method "allowsSelfCharged" of the manifest.
     */
    public static readonly ALLOWS_SELF_CHARGED = new NonVoidMethodSignatureModel( ClassType.MANIFEST.name,"allowsSelfCharged", BasicType.BOOLEAN.name, [])

    /**
     * The method "allowsUnsignedFaucet" of the manifest.
     */
    public static readonly ALLOWS_UNSIGNED_FAUCET = new NonVoidMethodSignatureModel(ClassType.MANIFEST.name,"allowsUnsignedFaucet", BasicType.BOOLEAN.name, [])

    /**
     * The method "skipsVerification" of the manifest.
     */
    public static readonly SKIPS_VERIFICATION = new NonVoidMethodSignatureModel(ClassType.MANIFEST.name,"skipsVerification", BasicType.BOOLEAN.name,[])

    /**
     * The method "getSignature" of the manifest.
     */
    public static readonly GET_SIGNATURE = new NonVoidMethodSignatureModel( ClassType.MANIFEST.name,"getSignature", ClassType.STRING.name,[])

    /**
     * The method "balance" of a contract.
     */
    public static readonly BALANCE = new NonVoidMethodSignatureModel(ClassType.CONTRACT.name,"balance", ClassType.BIG_INTEGER.name,[])

    /**
     * The method "balanceRed" of a contract.
     */
    public static readonly BALANCE_RED = new NonVoidMethodSignatureModel(ClassType.CONTRACT.name,"balanceRed", ClassType.BIG_INTEGER.name,[])

    /**
     * The method "getMaxFaucet" of the gamete.
     */
    public static readonly GET_MAX_FAUCET = new NonVoidMethodSignatureModel(ClassType.GAMETE.name,"getMaxFaucet", ClassType.BIG_INTEGER.name,[])

    /**
     * The method "getMaxRedFaucet" of the gamete.
     */
    public static readonly GET_MAX_RED_FAUCET = new NonVoidMethodSignatureModel(ClassType.GAMETE.name,"getMaxRedFaucet", ClassType.BIG_INTEGER.name,[])

    /**
     * The method "getValidators" of the manifest.
     */
    public static readonly GET_VALIDATORS = new NonVoidMethodSignatureModel(ClassType.MANIFEST.name,"getValidators", ClassType.VALIDATORS.name,[])

    /**
     * The method "getVersions" of the manifest.
     */
    public static readonly GET_VERSIONS = new NonVoidMethodSignatureModel( ClassType.MANIFEST.name,"getVersions", ClassType.VERSIONS.name,[])

    /**
     * The method "getMaxGasPerTransaction" of the gas station.
     */
    public static readonly GET_MAX_GAS_PER_TRANSACTION = new NonVoidMethodSignatureModel(ClassType.GAS_STATION.name,"getMaxGasPerTransaction", ClassType.BIG_INTEGER.name,[])

    /**
     * The method {@code getInitialGasPrice} of the gas station.
     */
    public static readonly GET_INITIAL_GAS_PRICE = new NonVoidMethodSignatureModel(ClassType.GAS_STATION.name, "getInitialGasPrice", ClassType.BIG_INTEGER.name, []);

    /**
     * The method "getTargetGasAtReward" of the gas station.
     */
    public static readonly GET_TARGET_GAS_AT_REWARD = new NonVoidMethodSignatureModel( ClassType.GAS_STATION.name,"getTargetGasAtReward", ClassType.BIG_INTEGER.name,[])

    /**
     * The method "getInflation" of the gas station.
     */
    public static readonly GET_INFLATION = new NonVoidMethodSignatureModel(ClassType.GAS_STATION.name,"getInflation", BasicType.LONG.name,[])

    /**
     * The method "getOblivion" of the gas station.
     */
    public static readonly GET_OBLIVION = new NonVoidMethodSignatureModel(ClassType.GAS_STATION.name,"getOblivion", BasicType.LONG.name,[])

    /**
     * The method "getHeight" of the validators.
     */
    public static readonly GET_HEIGHT = new NonVoidMethodSignatureModel(ClassType.VALIDATORS.name,"getHeight", ClassType.BIG_INTEGER.name,[])

    /**
     * The method "getNumberOfTransactions" of the validators.
     */
    public static readonly GET_NUMBER_OF_TRANSACTIONS = new NonVoidMethodSignatureModel(ClassType.VALIDATORS.name,"getNumberOfTransactions", ClassType.BIG_INTEGER.name,[])

    /**
     * The method {@code getTotalSupply} of the validators.
     */
    public static readonly GET_TOTAL_SUPPLY = new NonVoidMethodSignatureModel(ClassType.VALIDATORS.name, "getTotalSupply", ClassType.BIG_INTEGER.name, [])

    /**
     * The method {@code getTotalSupplyRed} of the validators.
     */
    public static readonly GET_TOTAL_SUPPLY_RED = new NonVoidMethodSignatureModel(ClassType.VALIDATORS.name, "getTotalSupplyRed", ClassType.BIG_INTEGER.name, [])

    /**
     * The method "getTicketForNewPoll" of the validators.
     */
    public static readonly GET_TICKET_FOR_NEW_POLL = new NonVoidMethodSignatureModel(ClassType.VALIDATORS.name,"getTicketForNewPoll", ClassType.BIG_INTEGER.name, [])

    /**
     * The method "getPolls" of the validators object.
     */
    public static readonly GET_POLLS = new NonVoidMethodSignatureModel(ClassType.VALIDATORS.name,"getPolls", ClassType.STORAGE_SET_VIEW.name,[])

    /**
     * The method "reward" of the validators contract.
     */
    public static readonly VALIDATORS_REWARD = new VoidMethodSignatureModel(ClassType.VALIDATORS.name, "reward", [ClassType.BIG_INTEGER.name, ClassType.BIG_INTEGER.name, ClassType.STRING.name, ClassType.STRING.name, ClassType.BIG_INTEGER.name, ClassType.BIG_INTEGER.name])

    /**
     * The method "getVerificationVersion" of the versions object.
     */
    public static readonly GET_VERIFICATION_VERSION = new NonVoidMethodSignatureModel(ClassType.VERSIONS.name,"getVerificationVersion", BasicType.INT.name,[])

    /**
     * The method "id" of a validator.
     */
    public static readonly ID = new NonVoidMethodSignatureModel(ClassType.VALIDATOR.name,"id", ClassType.STRING.name, [])

    /**
     * The method publicKey of an externally owned account.
     */
    public static readonly PUBLIC_KEY = new NonVoidMethodSignatureModel(ClassType.EOA.name,"publicKey", ClassType.STRING.name, [])

    /**
     * The method {@code getAccountsLedger} of the manifest.
     */
    public static readonly GET_ACCOUNTS_LEDGER = new NonVoidMethodSignatureModel(ClassType.MANIFEST.name, "getAccountsLedger", ClassType.ACCOUNTS_LEDGER.name, [])
}