import {RemoteNode} from "../RemoteNode";
import {StorageReferenceModel} from "../../models/values/StorageReferenceModel";
import {StorageValueModel} from "../../models/values/StorageValueModel";
import {InstanceMethodCallTransactionRequestModel} from "../../models/requests/InstanceMethodCallTransactionRequestModel";
import {CodeSignature} from "../lang/CodeSignature";
import {TransactionReferenceModel} from "../../models/values/TransactionReferenceModel";

export class NonceHelper {
    private static readonly GAS_LIMIT = "100000"
    private readonly remoteNode: RemoteNode

    constructor(remoteNode: RemoteNode) {
        this.remoteNode = remoteNode
    }

    /**
     * Yields the nonce of an account.
     * @param account the account
     * @param classpath the classpath where the account was installed
     * @return the nonce of the account
     */
    public async getNonceOf(account: StorageReferenceModel, classpath: TransactionReferenceModel): Promise<StorageValueModel> {
        return this.remoteNode.runInstanceMethodCallTransaction(new InstanceMethodCallTransactionRequestModel(
            account,
            "0",
            classpath,
            NonceHelper.GAS_LIMIT,
            "0",
            CodeSignature.NONCE,
            [],
            account,
            ''
        ))
    }
}