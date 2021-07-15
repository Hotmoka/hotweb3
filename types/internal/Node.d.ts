import { TransactionReferenceModel } from "./models/values/TransactionReferenceModel";
import { StorageReferenceModel } from "./models/values/StorageReferenceModel";
import { StateModel } from "./models/updates/StateModel";
import { ClassTagModel } from "./models/updates/ClassTagModel";
import { TransactionRestRequestModel } from "./models/requests/TransactionRestRequestModel";
import { TransactionRestResponseModel } from "./models/responses/TransactionRestResponseModel";
import { JarStoreInitialTransactionRequestModel } from "./models/requests/JarStoreInitialTransactionRequestModel";
import { GameteCreationTransactionRequestModel } from "./models/requests/GameteCreationTransactionRequestModel";
import { InitializationTransactionRequestModel } from "./models/requests/InitializationTransactionRequestModel";
import { JarStoreTransactionRequestModel } from "./models/requests/JarStoreTransactionRequestModel";
import { ConstructorCallTransactionRequestModel } from "./models/requests/ConstructorCallTransactionRequestModel";
import { StorageValueModel } from "./models/values/StorageValueModel";
import { InstanceMethodCallTransactionRequestModel } from "./models/requests/InstanceMethodCallTransactionRequestModel";
import { StaticMethodCallTransactionRequestModel } from "./models/requests/StaticMethodCallTransactionRequestModel";
import { SignatureAlgorithmResponseModel } from "./models/responses/SignatureAlgorithmResponseModel";
/**
 * API exposed by a remote Hotmoka node.
 */
export interface Node {
    /**
     * Yields the reference, in the store of the node, where the base Takamaka base classes are installed.
     * If this node has some form of commit, then this method returns a reference
     * only if the installation of the jar with the Takamaka base classes has been
     * already committed.
     * @return the reference of Takamaka base classes
     * @throws NoSuchElementException if the node has not been initialized yet
     * @throws HotmokaException if generic errors occur
     */
    getTakamakaCode(): Promise<TransactionReferenceModel>;
    /**
     * Yields the manifest installed in the store of the node. The manifest is an object of type
     * {@link io.takamaka.code.system.Manifest} that contains some information about the node,
     * useful for the users of the node.
     * If this node has some form of commit, then this method returns a reference
     * only if the installation of the manifest has been already committed.
     * @return the reference to the node
     * @throws NoSuchElementException if no manifest has been set for this node
     * @throws HotmokaException if generic errors occur
     */
    getManifest(): Promise<StorageReferenceModel>;
    /**
     * Yields the class tag of the object with the given storage reference.
     * If this method succeeds and this node has some form of commit, then the transaction
     * of the storage reference has been definitely committed in this node.
     * A node is allowed to keep in store all, some or none of the objects.
     * Hence, this method might fail to find the class tag although the object previously
     * existed in store.
     * @param object the storage reference of the object
     * @return the class tag, if any
     * @throws NoSuchElementException if there is no object with that reference or
     *                                if the class tag could not be found
     * @throws HotmokaException if generic errors occur
     */
    getClassTag(object: StorageReferenceModel): Promise<ClassTagModel>;
    /**
     * Yields the current state of the object at the given storage reference.
     * If this method succeeds and this node has some form of commit, then the transaction
     * of the storage reference has been definitely committed in this node.
     * A node is allowed to keep in store all, some or none of the objects.
     * Hence, this method might fail to find the state of the object although the object previously
     * existed in store.
     * @param object the storage reference of the object
     * @return the last updates of all its instance fields; these updates include
     *         the class tag update for the object
     * @throws NoSuchElementException if there is no object with that reference
     * @throws HotmokaException if generic errors occur
     */
    getState(object: StorageReferenceModel): Promise<StateModel>;
    /**
     * Yields the name of the algorithm used to sign requests with this node.
     * @return the name of the algorithm
     * @throws HotmokaException if generic errors occur
     */
    getNameOfSignatureAlgorithmForRequests(): Promise<SignatureAlgorithmResponseModel>;
    /**
     * Yields the request that generated the transaction with the given reference.
     * If this node has some form of commit, then this method can only succeed
     * when the transaction has been definitely committed in this node.
     * Nodes are allowed to keep in store all, some or none of the requests
     * that they received during their lifetime.
     * @param reference the reference of the transaction
     * @return the request
     * @throws NoSuchElementException if there is no request with that reference
     * @throws HotmokaException if generic errors occur
     */
    getRequestAt(reference: TransactionReferenceModel): Promise<TransactionRestRequestModel<unknown>>;
    /**
     * Yields the response generated for the request for the given transaction.
     * If this node has some form of commit, then this method can only succeed
     * or yield a {@link TransactionRejectedException} only
     * when the transaction has been definitely committed in this node.
     * Nodes are allowed to keep in store all, some or none of the responses
     * that they computed during their lifetime.
     * @param reference the reference of the transaction
     * @return the response
     * @throws TransactionRejectedException if there is a request for that transaction but it failed with this exception
     * @throws NoSuchElementException if there is no request, and hence no response, with that reference
     * @throws HotmokaException if generic errors occur
     */
    getResponseAt(reference: TransactionReferenceModel): Promise<TransactionRestResponseModel<unknown>>;
    /**
     * Waits until a transaction has been committed, or until its delivering fails.
     * If this method succeeds and this node has some form of commit, then the
     * transaction has been definitely committed.
     * Nodes are allowed to keep in store all, some or none of the responses
     * computed during their lifetime. Hence, this method might time out also
     * when a response has been computed in the past for the transaction of reference,
     * but it has not been kept in store.
     * @param reference the reference of the transaction
     * @return the response computed for request
     * @throws TransactionRejectedException if the request failed to be committed, because of this exception
     * @throws TimeoutException if the polling delay has expired but the request did not get committed
     * @throws InterruptedException if the current thread has been interrupted while waiting for the response
     * @throws HotmokaException if generic errors occur
     */
    getPolledResponseAt(reference: TransactionReferenceModel): Promise<TransactionRestResponseModel<unknown>>;
    /**
     * Expands the store of this node with a transaction that
     * installs a jar in it. It has no caller and requires no gas. The goal is to install, in the
     * node, some basic jars that are likely needed as dependencies by future jars.
     * For instance, the jar containing the basic contract classes.
     * This installation have special privileges, such as that of installing
     * packages in "io.takamaka.code.lang.*".
     * @param request the transaction request
     * @return the reference to the transaction, that can be used to refer to the jar in a class path or as future dependency of other jars
     * @throws TransactionRejectedException if the transaction could not be executed and the store of the node remained unchanged
     * @throws HotmokaException if generic errors occur
     */
    addJarStoreInitialTransaction(request: JarStoreInitialTransactionRequestModel): Promise<TransactionReferenceModel>;
    /**
     * Expands the store of this node with a transaction that creates a gamete, that is,
     * a red/green externally owned contract with the given initial amount of coins,
     * of class "io.takamaka.code.lang.Gamete".
     * This transaction has no caller and requires no gas.
     * @param request the transaction request
     * @return the reference to the freshly created gamete
     * @throws TransactionRejectedException if the transaction could not be executed and the store of the node remained unchanged
     * @throws HotmokaException if generic errors occur
     */
    addRedGreenGameteCreationTransaction(request: GameteCreationTransactionRequestModel): Promise<StorageReferenceModel>;
    /**
     * Expands the store of this node with a transaction that marks the node as
     * initialized and installs its manifest. After this transaction, no more initial transactions
     * can be executed on the node.
     * @param request the transaction request
     * @throws TransactionRejectedException if the transaction could not be executed and the store of the node remained unchanged
     * @throws HotmokaException if generic errors occur
     */
    addInitializationTransaction(request: InitializationTransactionRequestModel): Promise<void>;
    /**
     * Expands the store of this node with a transaction that installs a jar in it.
     * @param request the transaction request
     * @return the reference to the transaction, that can be used to refer to the jar in a class path or as future dependency of other jars
     * @throws TransactionRejectedException if the transaction could not be executed and the store of the node remained unchanged
     * @throws TransactionException if the transaction could be executed and the store of the node has been expanded with a failed transaction
     * @throws HotmokaException if generic errors occur
     */
    addJarStoreTransaction(request: JarStoreTransactionRequestModel): Promise<TransactionReferenceModel>;
    /**
     * Expands this node's store with a transaction that runs a constructor of a class.
     * @param request the request of the transaction
     * @return the created object, if the constructor was successfully executed, without exception
     * @throws TransactionRejectedException if the transaction could not be executed and the store of the node remained unchanged
     * @throws CodeExecutionException if the transaction could be executed and the node has been expanded with a failed transaction,
     *                                because of an exception in the user code in blockchain, that is allowed to be thrown by the constructor
     * @throws TransactionException if the transaction could be executed and the node has been expanded with a failed transaction,
     *                              because of an exception outside the user code in blockchain, or not allowed to be thrown by the constructor
     * @throws HotmokaException if generic errors occur
     */
    addConstructorCallTransaction(request: ConstructorCallTransactionRequestModel): Promise<StorageReferenceModel>;
    /**
     * Expands this node's store with a transaction that runs an instance method of an object already in this node's store.
     * @param request the transaction request
     * @return the result of the call, if the method was successfully executed, without exception. If the method is
     *         declared to return void, this result will be null
     * @throws TransactionRejectedException if the transaction could not be executed and the store of the node remained unchanged
     * @throws CodeExecutionException if the transaction could be executed and the node has been expanded with a failed transaction,
     *                                because of an exception in the user code in blockchain, that is allowed to be thrown by the method
     * @throws TransactionException if the transaction could be executed and the node has been expanded with a failed transaction,
     *                              because of an exception outside the user code in blockchain, or not allowed to be thrown by the method
     * @throws HotmokaException if generic errors occur
     */
    addInstanceMethodCallTransaction(request: InstanceMethodCallTransactionRequestModel): Promise<StorageValueModel>;
    /**
     * Expands this node's store with a transaction that runs a static method of a class in this node.
     * @param request the transaction request
     * @return the result of the call, if the method was successfully executed, without exception. If the method is
     *         declared to return void, this result will be null
     * @throws TransactionRejectedException if the transaction could not be executed and the store of the node remained unchanged
     * @throws CodeExecutionException if the transaction could be executed and the node has been expanded with a failed transaction,
     *                                because of an exception in the user code in blockchain, that is allowed to be thrown by the method
     * @throws TransactionException if the transaction could be executed and the node has been expanded with a failed transaction,
     *                              because of an exception outside the user code in blockchain, or not allowed to be thrown by the method
     * @throws HotmokaException if generic errors occur
     */
    addStaticMethodCallTransaction(request: StaticMethodCallTransactionRequestModel): Promise<StorageValueModel>;
    /**
     * Posts a transaction that expands the store of this node with a transaction that installs a jar in it.
     * @param request the transaction request
     * @return the future holding the reference to the transaction where the jar has been installed
     * @throws TransactionRejectedException if the transaction could not be posted
     * @throws HotmokaException if generic errors occur
     */
    postJarStoreTransaction(request: JarStoreTransactionRequestModel): Promise<TransactionReferenceModel>;
    /**
     * Posts a transaction that runs a constructor of a class in this node.
     * @param request the request of the transaction
     * @return the future holding the result of the computation
     * @throws TransactionRejectedException if the transaction could not be posted
     * @throws HotmokaException if generic errors occur
     */
    postConstructorCallTransaction(request: ConstructorCallTransactionRequestModel): Promise<TransactionReferenceModel>;
    /**
     * Posts a transaction that runs an instance method of an object already in this node's store.
     * @param request the transaction request
     * @return the future holding the result of the transaction
     * @throws TransactionRejectedException if the transaction could not be posted
     * @throws HotmokaException if generic errors occur
     */
    postInstanceMethodCallTransaction(request: InstanceMethodCallTransactionRequestModel): Promise<TransactionReferenceModel>;
    /**
     * Posts a request that runs a static method of a class in this node.
     * @param request the transaction request
     * @return the future holding the result of the transaction
     * @throws TransactionRejectedException if the transaction could not be posted
     * @throws HotmokaException if generic errors occur
     */
    postStaticMethodCallTransaction(request: StaticMethodCallTransactionRequestModel): Promise<TransactionReferenceModel>;
    /**
     * Runs an instance @View method of an object already in this node's store.
     * The node's store is not expanded, since the execution of the method has no side-effects.
     * @param request the transaction request
     * @return the result of the call, if the method was successfully executed, without exception
     * @throws TransactionRejectedException if the transaction could not be executed
     * @throws CodeExecutionException if the transaction could be executed but led to an exception in the user code in blockchain,
     *                                that is allowed to be thrown by the method
     * @throws TransactionException if the transaction could be executed but led to an exception outside the user code in blockchain,
     *                              or that is not allowed to be thrown by the method
     * @throws HotmokaException if generic errors occur
     */
    runInstanceMethodCallTransaction(request: InstanceMethodCallTransactionRequestModel): Promise<StorageValueModel>;
    /**
     * Runs a static @View method of a class in this node.
     * The node's store is not expanded, since the execution of the method has no side-effects.
     * @param request the transaction request
     * @return the result of the call, if the method was successfully executed, without exception
     * @throws TransactionRejectedException if the transaction could not be executed
     * @throws CodeExecutionException if the transaction could be executed but led to an exception in the user code in blockchain,
     *                                that is allowed to be thrown by the method
     * @throws TransactionException if the transaction could be executed but led to an exception outside the user code in blockchain,
     *                              or that is not allowed to be thrown by the method
     * @throws HotmokaException if generic errors occur
     */
    runStaticMethodCallTransaction(request: StaticMethodCallTransactionRequestModel): Promise<StorageValueModel>;
}
