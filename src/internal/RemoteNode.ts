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
import {HotmokaException} from "./exceptions/HotmokaException";
import {Signer} from "./signature/Signer";
import {NoSuchElementException} from "./exceptions/NoSuchElementException";
import {TransactionRejectedException} from "./exceptions/TransactionRejectedException";
import {TransactionException} from "./exceptions/TransactionException";
import {TimeoutException} from "./exceptions/TimeoutException";
import {InterruptedException} from "./exceptions/InterruptedException";
import {CodeExecutionException} from "./exceptions/CodeExecutionException";
import {NodeInfo} from "./models/info/NodeInfo";

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
     * Builds the instance of the remote node.
     * @param url the url of the remote node
     * @param signer the optional signer to sign the transaction requests
     */
    constructor(url: string, signer?: Signer) {
        this.url = url
        this.signer = signer
    }

    /**
     * It resolves the given error received from a HTTP call to a custom Hotmoka exception.
     * @param error the error
     * @return one of {@link HotmokaException},{@link NoSuchElementException},{@link TransactionRejectedException},
     *          {@link TransactionException}, {@link TimeoutException},
     *          {@link InterruptedException}, {@link CodeExecutionException} if exceptions are raised
     */
    private static resolveHotmokaExceptionFrom(error: any): Error {
        if (error && error.response && error.response.data) {
            const message = error.response.data.message ? error.response.data.message : 'Internal Error'
            const exceptionClassName = error.response.data.exceptionClassName

            if (exceptionClassName && (typeof exceptionClassName === 'string' || exceptionClassName instanceof String)) {
                if (exceptionClassName.indexOf("NoSuchElementException") != -1) {
                    return new NoSuchElementException(message)
                } else if (exceptionClassName.indexOf("TransactionRejectedException") != -1) {
                    return new TransactionRejectedException(message)
                } else if (exceptionClassName.indexOf("TransactionException") != -1) {
                    return new TransactionException(message)
                } else if (exceptionClassName.indexOf("TimeoutException") != -1) {
                    return new TimeoutException(message)
                } else if (exceptionClassName.indexOf("InterruptedException") != -1) {
                    return new InterruptedException(message)
                } else if (exceptionClassName.indexOf("CodeExecutionException") != -1) {
                    return new CodeExecutionException(message)
                } else {
                    return new HotmokaException(message)
                }
            } else {
                return new HotmokaException(message)
            }
        } else {
            return new HotmokaException('Internal Error')
        }
    }

    /**
     * Performs a GET request and yields a Promise of entity T as response.
     * @param url the url
     * @return a Promise of entity T
     * @throws one of {@link HotmokaException},{@link NoSuchElementException},{@link TransactionRejectedException},
     *          {@link TransactionException}, {@link TimeoutException},
     *          {@link InterruptedException}, {@link CodeExecutionException} if exceptions are raised
     */
    private static async get<T>(url: string): Promise<T> {
        try {
            const res: AxiosResponse = await axios.get<T>(url)
            return res.data
        } catch (error) {
            throw RemoteNode.resolveHotmokaExceptionFrom(error)
        }
    }

    /**
     * Performs a POST request and yields a Promise of entity T as response.
     * @param url the url
     * @param body the body of type P
     * @return a Promise of entity T
     * @throws one of {@link HotmokaException},{@link NoSuchElementException},{@link TransactionRejectedException},
     *          {@link TransactionException}, {@link TimeoutException},
     *          {@link InterruptedException}, {@link CodeExecutionException} if exceptions are raised
     */
    private static async post<T, P>(url: string, body?: P): Promise<T> {
        try {
            const res: AxiosResponse = await axios.post<T>(url, body)
            return res.data
        } catch (error) {
            throw RemoteNode.resolveHotmokaExceptionFrom(error)
        }
    }

    // get

    getClassTag(object: StorageReferenceModel): Promise<ClassTagModel> {
        return RemoteNode.post<ClassTagModel, StorageReferenceModel>(this.url + '/get/classTag', object)
    }

    getManifest(): Promise<StorageReferenceModel> {
        return RemoteNode.get<StorageReferenceModel>(this.url + '/get/manifest')
    }

    getNodeID(): Promise<NodeInfo> {
        return RemoteNode.get<NodeInfo>(this.url + '/get/nodeID')
    }

    getState(object: StorageReferenceModel): Promise<StateModel> {
        return RemoteNode.post<StateModel, StorageReferenceModel>(this.url + '/get/state', object)
    }

    getTakamakaCode(): Promise<TransactionReferenceModel> {
        return RemoteNode.get<TransactionReferenceModel>(this.url + '/get/takamakaCode')
    }

    getNameOfSignatureAlgorithmForRequests(): Promise<SignatureAlgorithmResponseModel> {
        return RemoteNode.get<SignatureAlgorithmResponseModel>(this.url + '/get/nameOfSignatureAlgorithmForRequests')
    }

    async getRequestAt(reference: TransactionReferenceModel): Promise<TransactionRestRequestModel<unknown>> {
        await this.wait(1000)
        return await RemoteNode.post<TransactionRestRequestModel<unknown>, TransactionReferenceModel>(this.url + '/get/request', reference)
    }

    async getResponseAt(reference: TransactionReferenceModel): Promise<TransactionRestResponseModel<unknown>> {
        await this.wait(1000)
        return RemoteNode.post<TransactionRestResponseModel<unknown>, TransactionReferenceModel>(this.url + '/get/response', reference)
    }

    async getPolledResponseAt(reference: TransactionReferenceModel): Promise<TransactionRestResponseModel<unknown>> {
        await this.wait(1000)
        return RemoteNode.post<TransactionRestResponseModel<unknown>, TransactionReferenceModel>(this.url + '/get/polledResponse', reference)
    }

    // add

    addJarStoreInitialTransaction(request: JarStoreInitialTransactionRequestModel): Promise<TransactionReferenceModel> {
        return RemoteNode.post<TransactionReferenceModel, JarStoreInitialTransactionRequestModel>(this.url + '/add/jarStoreInitialTransaction', request)
    }

    addRedGreenGameteCreationTransaction(request: GameteCreationTransactionRequestModel): Promise<StorageReferenceModel> {
        return RemoteNode.post<StorageReferenceModel, GameteCreationTransactionRequestModel>(this.url + '/add/gameteCreationTransaction', request)
    }

    addInitializationTransaction(request: InitializationTransactionRequestModel): Promise<void> {
        return RemoteNode.post<void, InitializationTransactionRequestModel>(this.url + '/add/initializationTransaction', request)
    }

    addJarStoreTransaction(request: JarStoreTransactionRequestModel): Promise<TransactionReferenceModel> {
        return RemoteNode.post<TransactionReferenceModel, JarStoreTransactionRequestModel>(this.url + '/add/jarStoreTransaction', request)
    }

    addConstructorCallTransaction(request: ConstructorCallTransactionRequestModel): Promise<StorageReferenceModel> {
        return RemoteNode.post<StorageReferenceModel, ConstructorCallTransactionRequestModel>(this.url + '/add/constructorCallTransaction', request)
    }

    addInstanceMethodCallTransaction(request: InstanceMethodCallTransactionRequestModel): Promise<StorageValueModel> {
        return RemoteNode.post<StorageValueModel, InstanceMethodCallTransactionRequestModel>(this.url + '/add/instanceMethodCallTransaction', request)
    }

    addStaticMethodCallTransaction(request: StaticMethodCallTransactionRequestModel): Promise<StorageValueModel> {
        return RemoteNode.post<StorageValueModel, StaticMethodCallTransactionRequestModel>(this.url + '/add/staticMethodCallTransaction', request)
    }

    // post

    postJarStoreTransaction(request: JarStoreTransactionRequestModel): Promise<TransactionReferenceModel> {
        return RemoteNode.post<TransactionReferenceModel, JarStoreTransactionRequestModel>(this.url + '/post/jarStoreTransaction', request)
    }

    postConstructorCallTransaction(request: ConstructorCallTransactionRequestModel): Promise<TransactionReferenceModel> {
        return RemoteNode.post<TransactionReferenceModel, ConstructorCallTransactionRequestModel>(this.url + '/post/constructorCallTransaction', request)
    }

    postInstanceMethodCallTransaction(request: InstanceMethodCallTransactionRequestModel): Promise<TransactionReferenceModel> {
        return RemoteNode.post<TransactionReferenceModel, InstanceMethodCallTransactionRequestModel>(this.url + '/post/instanceMethodCallTransaction', request)
    }

    postStaticMethodCallTransaction(request: StaticMethodCallTransactionRequestModel): Promise<TransactionReferenceModel> {
        return RemoteNode.post<TransactionReferenceModel, StaticMethodCallTransactionRequestModel>(this.url + '/post/staticMethodCallTransaction', request)
    }

    // run

    runInstanceMethodCallTransaction(request: InstanceMethodCallTransactionRequestModel): Promise<StorageValueModel> {
        return RemoteNode.post<StorageValueModel, InstanceMethodCallTransactionRequestModel>(this.url + '/run/instanceMethodCallTransaction', request)
    }

    runStaticMethodCallTransaction(request: StaticMethodCallTransactionRequestModel): Promise<StorageValueModel> {
        return RemoteNode.post<StorageValueModel, StaticMethodCallTransactionRequestModel>(this.url + '/run/staticMethodCallTransaction', request)
    }

    // helpers

    /**
     * Yields the info of this remote node.
     * @return the info of the node
     * @throws TransactionRejectedException if the transaction could not be executed
     * @throws CodeExecutionException if the transaction could be executed but led to an exception in the user code in blockchain,
     *                                that is allowed to be thrown by the method
     * @throws TransactionException if the transaction could be executed but led to an exception outside the user code in blockchain,
     *                              or that is not allowed to be thrown by the method
     * @throws HotmokaException if generic errors occur
     */
    info(): Promise<InfoModel> {
       return new ManifestHelper(this).info()
    }

    /**
     * Yields the nonce of an account.
     * @param account the account
     * @return the nonce of the account
     * @throws TransactionRejectedException if the transaction could not be executed
     * @throws CodeExecutionException if the transaction could be executed but led to an exception in the user code in blockchain,
     *                                that is allowed to be thrown by the method
     * @throws TransactionException if the transaction could be executed but led to an exception outside the user code in blockchain,
     *                              or that is not allowed to be thrown by the method
     * @throws HotmokaException if generic errors occur
     */
    getNonceOf(account: StorageReferenceModel): Promise<string> {
        return new NonceHelper(this).getNonceOf(account)
    }

    /**
     * Yields the gas price for a transaction.
     * @return the gas price
     * @throws TransactionRejectedException if the transaction could not be executed
     * @throws CodeExecutionException if the transaction could be executed but led to an exception in the user code in blockchain,
     *                                that is allowed to be thrown by the method
     * @throws TransactionException if the transaction could be executed but led to an exception outside the user code in blockchain,
     *                              or that is not allowed to be thrown by the method
     * @throws HotmokaException if generic errors occur
     */
    getGasPrice(): Promise<string> {
        return new GasHelper(this).getGasPrice()
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
    getGamete(): Promise<StorageReferenceModel> {
        return new ManifestHelper(this).getGamete()
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
    getChainId(): Promise<string> {
        return new ManifestHelper(this).getChainId()
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
    allowsUnsignedFaucet(): Promise<boolean> {
        return new ManifestHelper(this).allowsUnsignedFaucet()
    }

    private wait(milliseconds: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
}