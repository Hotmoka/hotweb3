import { Node } from "./Node";
import { StorageReferenceModel } from "./models/values/StorageReferenceModel";
import { ClassTagModel } from "./models/updates/ClassTagModel";
import { StateModel } from "./models/updates/StateModel";
import { TransactionReferenceModel } from "./models/values/TransactionReferenceModel";
import { TransactionRestRequestModel } from "./models/requests/TransactionRestRequestModel";
import { TransactionRestResponseModel } from "./models/responses/TransactionRestResponseModel";
import { JarStoreInitialTransactionRequestModel } from "./models/requests/JarStoreInitialTransactionRequestModel";
import { GameteCreationTransactionRequestModel } from "./models/requests/GameteCreationTransactionRequestModel";
import { InitializationTransactionRequestModel } from "./models/requests/InitializationTransactionRequestModel";
import { JarStoreTransactionRequestModel } from "./models/requests/JarStoreTransactionRequestModel";
import { ConstructorCallTransactionRequestModel } from "./models/requests/ConstructorCallTransactionRequestModel";
import { InstanceMethodCallTransactionRequestModel } from "./models/requests/InstanceMethodCallTransactionRequestModel";
import { StorageValueModel } from "./models/values/StorageValueModel";
import { StaticMethodCallTransactionRequestModel } from "./models/requests/StaticMethodCallTransactionRequestModel";
import { SignatureAlgorithmResponseModel } from "./models/responses/SignatureAlgorithmResponseModel";
import { InfoModel } from "./models/info/InfoModel";
import { Signer } from "./signature/Signer";
/**
 * Client to connect to a remote Hotmoka node
 * and to interact with the exposed API.
 */
export declare class RemoteNode implements Node {
    /**
     * The url of the remote Hotmoka node.
     */
    readonly url: string;
    /**
     * The optional signer to sign the transaction requests.
     */
    readonly signer?: Signer;
    /**
     * Builds the instance of the remote node.
     * @param url the url of the remote node
     * @param signer the optional signer to sign the transaction requests
     */
    constructor(url: string, signer?: Signer);
    /**
     * It resolves the given error received from a HTTP call to a custom Hotmoka exception.
     * @param error the error
     * @return one of {@link HotmokaException},{@link NoSuchElementException},{@link TransactionRejectedException},
     *          {@link TransactionException}, {@link TimeoutException},
     *          {@link InterruptedException}, {@link CodeExecutionException} if exceptions are raised
     */
    private static resolveHotmokaExceptionFrom;
    /**
     * Performs a GET request and yields a Promise of entity T as response.
     * @param url the url
     * @return a Promise of entity T
     * @throws one of {@link HotmokaException},{@link NoSuchElementException},{@link TransactionRejectedException},
     *          {@link TransactionException}, {@link TimeoutException},
     *          {@link InterruptedException}, {@link CodeExecutionException} if exceptions are raised
     */
    private static get;
    /**
     * Performs a POST request and yields a Promise of entity T as response.
     * @param url the url
     * @param body the body of type P
     * @return a Promise of entity T
     * @throws one of {@link HotmokaException},{@link NoSuchElementException},{@link TransactionRejectedException},
     *          {@link TransactionException}, {@link TimeoutException},
     *          {@link InterruptedException}, {@link CodeExecutionException} if exceptions are raised
     */
    private static post;
    getClassTag(object: StorageReferenceModel): Promise<ClassTagModel>;
    getManifest(): Promise<StorageReferenceModel>;
    getState(object: StorageReferenceModel): Promise<StateModel>;
    getTakamakaCode(): Promise<TransactionReferenceModel>;
    getNameOfSignatureAlgorithmForRequests(): Promise<SignatureAlgorithmResponseModel>;
    getRequestAt(reference: TransactionReferenceModel): Promise<TransactionRestRequestModel<unknown>>;
    getResponseAt(reference: TransactionReferenceModel): Promise<TransactionRestResponseModel<unknown>>;
    getPolledResponseAt(reference: TransactionReferenceModel): Promise<TransactionRestResponseModel<unknown>>;
    addJarStoreInitialTransaction(request: JarStoreInitialTransactionRequestModel): Promise<TransactionReferenceModel>;
    addRedGreenGameteCreationTransaction(request: GameteCreationTransactionRequestModel): Promise<StorageReferenceModel>;
    addInitializationTransaction(request: InitializationTransactionRequestModel): Promise<void>;
    addJarStoreTransaction(request: JarStoreTransactionRequestModel): Promise<TransactionReferenceModel>;
    addConstructorCallTransaction(request: ConstructorCallTransactionRequestModel): Promise<StorageReferenceModel>;
    addInstanceMethodCallTransaction(request: InstanceMethodCallTransactionRequestModel): Promise<StorageValueModel>;
    addStaticMethodCallTransaction(request: StaticMethodCallTransactionRequestModel): Promise<StorageValueModel>;
    postJarStoreTransaction(request: JarStoreTransactionRequestModel): Promise<TransactionReferenceModel>;
    postConstructorCallTransaction(request: ConstructorCallTransactionRequestModel): Promise<TransactionReferenceModel>;
    postInstanceMethodCallTransaction(request: InstanceMethodCallTransactionRequestModel): Promise<TransactionReferenceModel>;
    postStaticMethodCallTransaction(request: StaticMethodCallTransactionRequestModel): Promise<TransactionReferenceModel>;
    runInstanceMethodCallTransaction(request: InstanceMethodCallTransactionRequestModel): Promise<StorageValueModel>;
    runStaticMethodCallTransaction(request: StaticMethodCallTransactionRequestModel): Promise<StorageValueModel>;
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
    info(): Promise<InfoModel>;
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
    getNonceOf(account: StorageReferenceModel): Promise<string>;
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
    getGasPrice(): Promise<string>;
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
    getGamete(): Promise<StorageReferenceModel>;
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
    getChainId(): Promise<string>;
    private wait;
}
