import {Node} from "./Node"
import {StorageReferenceModel} from "./models/values/StorageReferenceModel";
import {ClassTagModel} from "./models/updates/ClassTagModel";
import {StateModel} from "./models/updates/StateModel";
import {TransactionReferenceModel} from "./models/values/TransactionReferenceModel";
import axios, {AxiosResponse} from "axios";
import {TransactionRestRequestModel} from "./models/requests/TransactionRestRequestModel";
import {TransactionRestResponseModel} from "./models/responses/TransactionRestResponseModel";
import {JarStoreInitialTransactionRequestModel} from "./models/requests/JarStoreInitialTransactionRequestModel";
import {GameteCreationTransactionRequestModel} from "./models/requests/GameteCreationTransactionRequestModel";
import {InitializationTransactionRequestModel} from "./models/requests/InitializationTransactionRequestModel";
import {JarStoreTransactionRequestModel} from "./models/requests/JarStoreTransactionRequestModel";
import {ConstructorCallTransactionRequestModel} from "./models/requests/ConstructorCallTransactionRequestModel";
import {InstanceMethodCallTransactionRequestModel} from "./models/requests/InstanceMethodCallTransactionRequestModel";
import {StorageValueModel} from "./models/values/StorageValueModel";
import {StaticMethodCallTransactionRequestModel} from "./models/requests/StaticMethodCallTransactionRequestModel";
import {SignatureAlgorithmResponseModel} from "./models/responses/SignatureAlgorithmResponseModel";
import {InfoModel} from "./models/info/InfoModel";
import {ManifestHelper} from "./helpers/ManifestHelper";
import {NonceHelper} from "./helpers/NonceHelper";
import {GasHelper} from "./helpers/GasHelper";
import {HotmokaException} from "./exception/HotmokaException";
import {Signer} from "./signature/Signer";

/**
 * Client to connect to a remote Hotmoka node
 * and to interact with the exposed API.
 */
export class RemoteNode implements Node {
    /**
     * The url of the remote Hotmoka node.
     */
    public readonly url: string

    /**
     * The optional signer to sign the transaction requests.
     */
    public readonly signer?: Signer

    /**
     * It constructs the instance of the remote node.
     * @param url the url of the remote node
     * @param signer the optional signer to sign the transaction requests
     */
    constructor(url: string, signer?: Signer) {
        this.url = url
        this.signer = signer
    }


    /**
     * It resolves the given error received from a HTTP call.
     * @param error the error
     * @return the message error
     */
    private static resolveError(error: any): string {
        if (error && error.response && error.response.data) {
            const message = error.response.data.message ? error.response.data.message : 'Internal Error'
            return error.response.data.exceptionClassName ? error.response.data.exceptionClassName + '@' + message : message
        } else {
            return 'Internal Error'
        }
    }


    /**
     * Performs a GET request and yields a Promise of entity T as response.
     * @param url the url
     * @return a Promise of entity T
     * @throws HotmokaException if errors occur
     */
    private static async get<T>(url: string): Promise<T> {
        try {
            const res: AxiosResponse = await axios.get<T>(url)
            return res.data
        } catch (error) {
            throw new HotmokaException(RemoteNode.resolveError(error))
        }
    }

    /**
     * Performs a POST request and yields a Promise of entity T as response.
     * @param url the url
     * @param body the body of type P
     * @return a Promise of entity T
     * @throws HotmokaException if errors occur
     */
    private static async post<T, P>(url: string, body?: P): Promise<T> {
        try {
            const res: AxiosResponse = await axios.post<T>(url, body)
            return res.data
        } catch (error) {
            throw new HotmokaException(RemoteNode.resolveError(error))
        }
    }

    // get

    async getClassTag(object: StorageReferenceModel): Promise<ClassTagModel> {
        return await RemoteNode.post<ClassTagModel, StorageReferenceModel>(this.url + '/get/classTag', object)
    }

    async getManifest(): Promise<StorageReferenceModel> {
        return await RemoteNode.get<StorageReferenceModel>(this.url + '/get/manifest')
    }

    async getState(object: StorageReferenceModel): Promise<StateModel> {
        return await RemoteNode.post<StateModel, StorageReferenceModel>(this.url + '/get/state', object)
    }

    async getTakamakaCode(): Promise<TransactionReferenceModel> {
        return await RemoteNode.get<TransactionReferenceModel>(this.url + '/get/takamakaCode')
    }

    async getNameOfSignatureAlgorithmForRequests(): Promise<SignatureAlgorithmResponseModel> {
        return await RemoteNode.get<SignatureAlgorithmResponseModel>(this.url + '/get/nameOfSignatureAlgorithmForRequests')
    }

    async getRequestAt(reference: TransactionReferenceModel): Promise<TransactionRestRequestModel<unknown>> {
        await this.wait(1000)
        return await RemoteNode.post<TransactionRestRequestModel<unknown>, TransactionReferenceModel>(this.url + '/get/request', reference)
    }

    async getResponseAt(reference: TransactionReferenceModel): Promise<TransactionRestResponseModel<unknown>> {
        await this.wait(1000)
        return await RemoteNode.post<TransactionRestResponseModel<unknown>, TransactionReferenceModel>(this.url + '/get/response', reference)
    }

    async getPolledResponseAt(reference: TransactionReferenceModel): Promise<TransactionRestResponseModel<unknown>> {
        await this.wait(1000)
        return await RemoteNode.post<TransactionRestResponseModel<unknown>, TransactionReferenceModel>(this.url + '/get/polledResponse', reference)
    }

    // add

    async addJarStoreInitialTransaction(request: JarStoreInitialTransactionRequestModel): Promise<TransactionReferenceModel> {
        return await RemoteNode.post<TransactionReferenceModel, JarStoreInitialTransactionRequestModel>(this.url + '/add/jarStoreInitialTransaction', request)
    }

    async addRedGreenGameteCreationTransaction(request: GameteCreationTransactionRequestModel): Promise<StorageReferenceModel> {
        return await RemoteNode.post<StorageReferenceModel, GameteCreationTransactionRequestModel>(this.url + '/add/gameteCreationTransaction', request)
    }

    async addInitializationTransaction(request: InitializationTransactionRequestModel): Promise<void> {
        return await RemoteNode.post<void, InitializationTransactionRequestModel>(this.url + '/add/initializationTransaction', request)
    }

    async addJarStoreTransaction(request: JarStoreTransactionRequestModel): Promise<TransactionReferenceModel> {
        return await RemoteNode.post<TransactionReferenceModel, JarStoreTransactionRequestModel>(this.url + '/add/jarStoreTransaction', request)
    }

    async addConstructorCallTransaction(request: ConstructorCallTransactionRequestModel): Promise<StorageReferenceModel> {
        return await RemoteNode.post<StorageReferenceModel, ConstructorCallTransactionRequestModel>(this.url + '/add/constructorCallTransaction', request)
    }

    async addInstanceMethodCallTransaction(request: InstanceMethodCallTransactionRequestModel): Promise<StorageValueModel> {
        return await RemoteNode.post<StorageValueModel, InstanceMethodCallTransactionRequestModel>(this.url + '/add/instanceMethodCallTransaction', request)
    }

    async addStaticMethodCallTransaction(request: StaticMethodCallTransactionRequestModel): Promise<StorageValueModel> {
        return await RemoteNode.post<StorageValueModel, StaticMethodCallTransactionRequestModel>(this.url + '/add/staticMethodCallTransaction', request)
    }

    // post

    async postJarStoreTransaction(request: JarStoreTransactionRequestModel): Promise<TransactionReferenceModel> {
        return await RemoteNode.post<TransactionReferenceModel, JarStoreTransactionRequestModel>(this.url + '/post/jarStoreTransaction', request)
    }

    async postConstructorCallTransaction(request: ConstructorCallTransactionRequestModel): Promise<TransactionReferenceModel> {
        return await RemoteNode.post<TransactionReferenceModel, ConstructorCallTransactionRequestModel>(this.url + '/post/constructorCallTransaction', request)
    }

    async postInstanceMethodCallTransaction(request: InstanceMethodCallTransactionRequestModel): Promise<TransactionReferenceModel> {
        return await RemoteNode.post<TransactionReferenceModel, InstanceMethodCallTransactionRequestModel>(this.url + '/post/instanceMethodCallTransaction', request)
    }

    async postStaticMethodCallTransaction(request: StaticMethodCallTransactionRequestModel): Promise<TransactionReferenceModel> {
        return await RemoteNode.post<TransactionReferenceModel, StaticMethodCallTransactionRequestModel>(this.url + '/post/staticMethodCallTransaction', request)
    }

    // run

    async runInstanceMethodCallTransaction(request: InstanceMethodCallTransactionRequestModel): Promise<StorageValueModel> {
        return await RemoteNode.post<StorageValueModel, InstanceMethodCallTransactionRequestModel>(this.url + '/run/instanceMethodCallTransaction', request)
    }

    async runStaticMethodCallTransaction(request: StaticMethodCallTransactionRequestModel): Promise<StorageValueModel> {
        return await RemoteNode.post<StorageValueModel, StaticMethodCallTransactionRequestModel>(this.url + '/run/staticMethodCallTransaction', request)
    }

    // helpers

    /**
     * Yields the info of this remote node.
     * @return the info of the node
     * @throws HotmokaException if generic errors occur
     */
    async info(): Promise<InfoModel> {
       return await new ManifestHelper(this).info()
    }

    /**
     * Yields the nonce of an account.
     * @param account the account
     * @return the nonce of the account
     * @throws HotmokaException if generic errors occur
     */
    async getNonceOf(account: StorageReferenceModel): Promise<string> {
        const nonce = await new NonceHelper(this).getNonceOf(account)
        return nonce.value ?? '0'
    }

    /**
     * Yields the gas price for a transaction.
     * @return the gas price
     * @throws HotmokaException if generic errors occur
     */
    async getGasPrice(): Promise<string> {
        const gasPrice = await new GasHelper(this).getGasPrice()
        return gasPrice.value ?? '1'
    }

    private wait(milliseconds: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
}