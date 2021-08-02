import {RemoteNode} from "../RemoteNode";
import {eddsa} from "elliptic";
import {Buffer} from "buffer";
import {createHash, randomBytes} from "crypto";
import {Algorithm} from "../signature/Algorithm";
import {ManifestHelper} from "./ManifestHelper";
import {ClassType} from "../lang/ClassType";
import {HotmokaException} from "../exceptions/HotmokaException";
import {InstanceMethodCallTransactionRequestModel} from "../models/requests/InstanceMethodCallTransactionRequestModel";
import {NonceHelper} from "./NonceHelper";
import {GasHelper} from "./GasHelper";
import {NonVoidMethodSignatureModel} from "../models/signatures/NonVoidMethodSignatureModel";
import {StorageValueModel} from "../models/values/StorageValueModel";


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
    public static checkPassword(entropy: string, password: string, publicKeyToCheck: string, privateKeyToCheck: string): boolean {
        const {publicKey, privateKey} = AccountHelper.generateEd25519KeyPair(entropy, password)
        return publicKeyToCheck === publicKey && privateKeyToCheck === privateKey
    }

    /**
     * It generates a 32 bytes entropy.
     * @return the entropy encoded in hex
     */
    public static generateEntropy(): string {
       return randomBytes(32).toString('hex')
    }

    /**
     * Creates a key pair from the given entropy and password.
     * @param entropy random bytes encoded in hex
     * @param password the password
     * @return {{publicKey, privateKey}} the key pair in base64 derived from entropy and password
     */
    public static generateEd25519KeyPair(entropy: string, password: string): { privateKey: string; publicKey: string } {
        const ec = new eddsa('ed25519')
        const entropyWithPwd = Buffer.concat([Buffer.from(entropy, 'hex'), Buffer.from(password)])
        const hash = createHash('sha256')
        hash.update(entropyWithPwd)
        const random = hash.digest('hex')

        const keyPair = ec.keyFromSecret(Buffer.from(random, 'hex'))
        return {
            publicKey: Buffer.from(keyPair.getPublic()).toString('base64'),
            privateKey: Buffer.from(keyPair.getSecret()).toString('base64')
        }
    }
}