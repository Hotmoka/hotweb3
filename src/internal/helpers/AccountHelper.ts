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
import {StorageReferenceModel} from "../models/values/StorageReferenceModel";
import {CodeSignature} from "../lang/CodeSignature";
import {Base58} from "../bip39/Base58";

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
     * @param keyPair the key pair of the new account
     * @param balance the balance of the new account
     * @param balanceRed the red balance of the new account
     * @return the an account
     * @throws TransactionRejectedException if the transaction could not be executed
     * @throws CodeExecutionException if the transaction could be executed but led to an exception in the user code in blockchain,
     *                                that is allowed to be thrown by the method
     * @throws TransactionException if the transaction could be executed but led to an exception outside the user code in blockchain,
     *                              or that is not allowed to be thrown by the method
     */
    public async createAccountFromFaucet(algorithm: Algorithm, keyPair: KeyPair, balance: string, balanceRed: string): Promise<Account> {
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

        const accountReference = await this.remoteNode.addInstanceMethodCallTransaction(new InstanceMethodCallTransactionRequestModel(
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
                StorageValueModel.newStorageValue(keyPair.publicKey, ClassType.STRING.name)
            ]
        ))

        return Promise.resolve(new Account(keyPair.entropy, keyPair.publicKey, Base58.encode(keyPair.publicKey), balance, accountReference.reference))
    }

    /**
     * It creates a local account without the reference in the store of the remote node.
     * @param keyPair the key pair generated
     * @return a local account
     */
    public createLocalAccount(keyPair: KeyPair): Account {
        return new Account(keyPair.entropy, keyPair.publicKey, Base58.encode(keyPair.publicKey), '0')
    }

    /**
     * It imports a Hotmoka account.
     * @param name the name of the account
     * @param mnemonic the mnemonic
     * @param password the password
     */
    public async importAccount(name: string, mnemonic: string, password: string): Promise<Account> {
        const account = new Bip39({dictionary: Bip39Dictionary.ENGLISH, mnemonic: mnemonic}).getAccount()
        if (!account.reference) {
            throw new HotmokaException('Unable to reconstruct the storage reference of the account')
        }
        const keyPair = this.generateEd25519KeyPairFrom(password, Bip39Dictionary.ENGLISH, Buffer.from(account.entropy, 'hex'))
        const accountIsVerified = await this.verifyAccount(account.reference, keyPair.publicKey)
        if (!accountIsVerified) {
            throw new HotmokaException('The public key of the account does not match its entropy')
        }

        const balance = await this.getBalance(account.reference)
        return Promise.resolve(new Account(account.entropy, keyPair.publicKey, name, balance, account.reference))
    }

    /**
     * Checks that the given account address is actually an account object in the remote node
     * with the same public key as the account.
     * @param accountAddress the address of the account
     * @param publicKeyToCheck the public key to check encoded in base64
     * @return true if the provided public key is equal to the public key stored in the remote node,
     *              false otherwise
     */
    public async verifyAccount(accountAddress: StorageReferenceModel, publicKeyToCheck: string): Promise<boolean> {
        const publicKey = await this.getPublicKey(accountAddress)
        return Promise.resolve(publicKey === publicKeyToCheck)
    }


    /**
     * Creates a {@link KeyPair} from the given password, BIP39 dictionary and entropy.
     * @param password the password
     * @param bip39Dictionary the bip39 dictionary to use. Available options: "english"
     * @param entropy the optional entropy. It will use a random 16 bytes entropy if not provided.
     * @return a {@link KeyPair}
     */
    public generateEd25519KeyPairFrom(password: string, bip39Dictionary: Bip39Dictionary, entropy?: Buffer): KeyPair {
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
    public generateAccountFrom(password: string, mnemonic: string, bip39Dictionary: Bip39Dictionary): Account {
        return new Bip39({dictionary: bip39Dictionary, mnemonic: mnemonic}).getAccount()
    }

    /**
     * It returns the public key from the remote node of the given account reference.
     * @param reference the reference of the account
     * @return the public key
     */
    private async getPublicKey(reference: StorageReferenceModel): Promise<string> {
        const takamakaCode = await this.remoteNode.getTakamakaCode()
        const result = await this.remoteNode.runInstanceMethodCallTransaction(new InstanceMethodCallTransactionRequestModel(
            reference,
            "0",
            "",
            "100000",
            "0",
            takamakaCode,
            CodeSignature.PUBLIC_KEY,
            reference,
            []
            )
        )

        if (result && result.value) {
            return result.value
        } else {
            throw new HotmokaException("Unable to get the public key of " + reference.transaction.hash)
        }
    }

    /**
     * It returns the balance of the given account reference from the remote node.
     * @param reference the reference of the account
     * @return the balance
     */
    private async getBalance(reference: StorageReferenceModel): Promise<string> {
        const takamakaCode = await this.remoteNode.getTakamakaCode()
        const result = await this.remoteNode.runInstanceMethodCallTransaction(new InstanceMethodCallTransactionRequestModel(
            reference,
            "0",
            "",
            "100000",
            "0",
            takamakaCode,
            CodeSignature.BALANCE,
            reference,
            []
            )
        )

        if (result && result.value) {
            return result.value
        } else {
            throw new HotmokaException("Unable to get the balance of " + reference.transaction.hash)
        }
    }
 }