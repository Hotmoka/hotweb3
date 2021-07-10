import { Node } from "./Node";
import { StorageReferenceModel } from "../models/values/StorageReferenceModel";
import { ClassTagModel } from "../models/updates/ClassTagModel";
import { StateModel } from "../models/updates/StateModel";
import { TransactionReferenceModel } from "../models/values/TransactionReferenceModel";
import { TransactionRestRequestModel } from "../models/requests/TransactionRestRequestModel";
import { TransactionRestResponseModel } from "../models/responses/TransactionRestResponseModel";
import { JarStoreInitialTransactionRequestModel } from "../models/requests/JarStoreInitialTransactionRequestModel";
import { GameteCreationTransactionRequestModel } from "../models/requests/GameteCreationTransactionRequestModel";
import { InitializationTransactionRequestModel } from "../models/requests/InitializationTransactionRequestModel";
import { JarStoreTransactionRequestModel } from "../models/requests/JarStoreTransactionRequestModel";
import { ConstructorCallTransactionRequestModel } from "../models/requests/ConstructorCallTransactionRequestModel";
import { InstanceMethodCallTransactionRequestModel } from "../models/requests/InstanceMethodCallTransactionRequestModel";
import { StorageValueModel } from "../models/values/StorageValueModel";
import { StaticMethodCallTransactionRequestModel } from "../models/requests/StaticMethodCallTransactionRequestModel";
import { SignatureAlgorithmResponseModel } from "../models/responses/SignatureAlgorithmResponseModel";
import { Signature } from "./signature/Signature";
import { InfoModel } from "../models/info/InfoModel";
export declare class RemoteNode implements Node {
    readonly url: string;
    readonly signature?: Signature;
    /**
     * It constructs the instance of the remote node.
     * @param url the url of the remote node
     * @param signature the optional signature to sign the requests
     */
    constructor(url: string, signature?: Signature);
    /**
     * It resolves the given error received from the HTTP call.
     * @param error the error
     * @private
     * @return HotmokaError the parsed error model
     */
    private static resolveError;
    /**
     * Performs a GET request and yields a Promise of entity T as response.
     * @param url the url
     * @private
     * @return a Promise of entity T
     */
    private static get;
    /**
     * Performs a POST request and yields a Promise of entity T as response.
     * @param url the url
     * @param body the body of type P
     * @private
     * @return a Promise of entity T
     */
    private static post;
    getClassTag(request: StorageReferenceModel): Promise<ClassTagModel>;
    getManifest(): Promise<StorageReferenceModel>;
    getState(request: StorageReferenceModel): Promise<StateModel>;
    getTakamakaCode(): Promise<TransactionReferenceModel>;
    getNameOfSignatureAlgorithmForRequests(): Promise<SignatureAlgorithmResponseModel>;
    getRequestAt(request: TransactionReferenceModel): Promise<TransactionRestRequestModel<unknown>>;
    getResponseAt(request: TransactionReferenceModel): Promise<TransactionRestResponseModel<unknown>>;
    getPolledResponseAt(request: TransactionReferenceModel): Promise<TransactionRestResponseModel<unknown>>;
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
    info(): Promise<InfoModel>;
    private wait;
}
