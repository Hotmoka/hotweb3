import {RemoteNode} from "../RemoteNode";
import {Algorithm} from "../signature/Algorithm";
import {ManifestHelper} from "./ManifestHelper";
import {ClassType} from "../lang/ClassType";
import {HotmokaException} from "../exceptions/HotmokaException";
import {InstanceMethodCallTransactionRequestModel} from "../models/requests/InstanceMethodCallTransactionRequestModel";
import {NonceHelper} from "./NonceHelper";
import {GasHelper} from "./GasHelper";
import {NonVoidMethodSignatureModel} from "../models/signatures/NonVoidMethodSignatureModel";
import {StorageValueModel} from "../models/values/StorageValueModel";
import {Bip39} from "../bip39/Bip39";
import {KeyPair} from "../bip39/KeyPair";
import {KeyPairGenerator} from "../bip39/KeyPairGenerator";
import {Bip39Dictionary} from "../bip39/Bip39Dictionary";
import {Account} from "../models/Account";

export class AccountHelper {
    private readonly remoteNode: RemoteNode
    private readonly manifestHelper: ManifestHelper
    private readonly nonceHelper: NonceHelper
    private readonly gasHelper: GasHelper

    /**
     * Builds an object that helps with the creation of new accounts.
     * @param remoteNode the remote node
     */
    constructor(remoteNode: RemoteNode) {
        this.remoteNode = remoteNode
        this.manifestHelper = new ManifestHelper(this.remoteNode)
        this.nonceHelper = new NonceHelper(this.remoteNode)
        this.gasHelper = new GasHelper(this.remoteNode)
    }

    /**
     * Creates a new account by letting the faucet pay.
     * @param algorithm the signature algorithm for the new account
     * @param publicKey the public key of the new account
     * @param balance the balance of the new account
     * @param balanceRed the red balance of the new account
     * @return the storage reference of the account
     * @throws TransactionRejectedException if the transaction could not be executed
     * @throws CodeExecutionException if the transaction could be executed but led to an exception in the user code in blockchain,
     *                                that is allowed to be thrown by the method
     * @throws TransactionException if the transaction could be executed but led to an exception outside the user code in blockchain,
     *                              or that is not allowed to be thrown by the method
     */
    async createAccountFromFaucet(algorithm: Algorithm, publicKey: string, balance: string, balanceRed: string): Promise<StorageValueModel> {
        if (algorithm === Algorithm.SHA256DSA) {
            throw new HotmokaException("Algorithm not implemented")
        }

        const takamakaCode = await this.remoteNode.getTakamakaCode()
        const gamete = await this.manifestHelper.getGamete()
        const nonceOfGamete = await this.nonceHelper.getNonceOf(gamete)
        const nonceOfGameteValue = nonceOfGamete.value ?? '0'
        const methodName = "faucet" + Algorithm[algorithm];
        const eoaType = new ClassType(ClassType.EOA.name + Algorithm[algorithm]);
        const gas = "100000"
        const gasPrice = await this.gasHelper.getGasPrice()
        const gasPriceValue = gasPrice.value ?? '0'
        const chainId = await this.manifestHelper.getChainId()

        return this.remoteNode.addInstanceMethodCallTransaction(new InstanceMethodCallTransactionRequestModel(
            gamete,
            nonceOfGameteValue,
            chainId,
            gas,
            gasPriceValue,
            takamakaCode,
            new NonVoidMethodSignatureModel(ClassType.GAMETE.name, methodName, eoaType.name, [ClassType.BIG_INTEGER.name, ClassType.BIG_INTEGER.name, ClassType.STRING.name]),
            gamete,
            [
                StorageValueModel.newStorageValue(balance, ClassType.BIG_INTEGER.name),
                StorageValueModel.newStorageValue(balanceRed, ClassType.BIG_INTEGER.name),
                StorageValueModel.newStorageValue(publicKey, ClassType.STRING.name)
            ]
        ))
    }

    /**
     * Checks if the provided public and private key are equal to the public and private key
     * generated from the given entropy and password.
     * @param entropy the entropy encoded in hex
     * @param password the password
     * @param publicKeyToCheck the public key to check encoded in base64
     * @param privateKeyToCheck the private key to check encoded in base64
     * @return true if the provided public and private key are equal to the public and private key generated from the given entropy and password,
     *              false otherwise
     */
    public static verifyAccount(entropy: string, password: string, publicKeyToCheck: string, privateKeyToCheck: string): boolean {
        const {publicKey, privateKey} = AccountHelper.generateEd25519KeyPairFrom(password, Bip39Dictionary.ENGLISH)
        return publicKeyToCheck === publicKey && privateKeyToCheck === privateKey
    }


    /**
     * Creates a {@link KeyPair} from the given password, BIP39 dictionary and entropy.
     * @param password the password
     * @param bip39Dictionary the bip39 dictionary to use. Available options: "english"
     * @param entropy the optional entropy. It will use a random 16 bytes entropy if not provided.
     * @return a {@link KeyPair}
     */
    public static generateEd25519KeyPairFrom(password: string, bip39Dictionary: Bip39Dictionary, entropy?: Buffer): KeyPair {
        return KeyPairGenerator.generateEd25519KeyPair(password, bip39Dictionary, entropy)
    }

    /**
     * Yields the account reconstructed from these BIP39 mnemonic words.
     * This works only if the words were actually derived from an account.
     * @param password the password of the account
     * @param mnemonic the BIP39 mnemonic words
     * @param bip39Dictionary the bi39 dictionary used
     * @return the account
     */
    public static generateAccountFrom(password: string, mnemonic: string, bip39Dictionary: Bip39Dictionary): Account {
        return new Bip39({dictionary: bip39Dictionary, mnemonic: mnemonic}).getAccount()
    }
 }