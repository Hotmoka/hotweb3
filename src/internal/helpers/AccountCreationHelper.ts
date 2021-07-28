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


export class AccountCreationHelper {
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
     * It generates a 32 bytes entropy.
     * @return the entropy encoded as hex
     */
    public generateEntropy(): string {
       return randomBytes(32).toString('hex')
    }

    /**
     * It generates the public key of the account from the given entropy and password.
     * @param entropy the entropy
     * @param password the password
     * @return the public key encoded in base64
     */
    public generatePublicKey(entropy: string, password: string): string {
        const keyPair = AccountCreationHelper.generateEd25519KeyPair(Buffer.from(entropy, 'hex'), Buffer.from(password))
        return Buffer.from(keyPair.getPublic()).toString('base64')
    }

    /**
     * Creates a key pair from the given entropy and password.
     * @param entropy random bytes
     * @param password data that gets hashed into the entropy to get the private key data
     * @return the key pair derived from entropy and password
     */
    private static generateEd25519KeyPair(entropy: Buffer, password: Buffer): eddsa.KeyPair {
        const ec = new eddsa('ed25519')
        const entropyWithPwd = Buffer.concat([entropy, password])
        const hash = createHash('sha256')
        hash.update(entropyWithPwd)
        const random = hash.digest('hex')

        return ec.keyFromSecret(Buffer.from(random, 'hex'))
    }
}