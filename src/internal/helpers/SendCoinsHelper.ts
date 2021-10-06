import {RemoteNode} from "../RemoteNode";
import {StorageReferenceModel} from "../models/values/StorageReferenceModel";
import {InstanceMethodCallTransactionRequestModel} from "../models/requests/InstanceMethodCallTransactionRequestModel";
import {ClassType} from "../lang/ClassType";
import {StorageValueModel} from "../models/values/StorageValueModel";
import {VoidMethodSignatureModel} from "../models/signatures/VoidMethodSignatureModel";
import {KeyPair} from "../bip39/KeyPair";
import {Signer} from "../signature/Signer";
import {AccountHelper} from "./AccountHelper";
import {CodeSignature} from "../lang/CodeSignature";
import {TransactionReferenceModel} from "../models/values/TransactionReferenceModel";
import {HotmokaException} from "../exceptions/HotmokaException";

export class SendCoinsHelper {
    private static readonly _100_000 = 100000
    private readonly remoteNode: RemoteNode

    /**
     * Builds an object that helps with sending coins to accounts.
     * @param remoteNode the remote node
     */
    constructor(remoteNode: RemoteNode) {
        this.remoteNode = remoteNode
    }

    /**
     * Sends coins to an account, by letting another account pay.
     * @param payer the sender of the coins
     * @param keysOfPayer the keys of the {@code payer}
     * @param destination the destination account
     * @param amount the balance to transfer
     * @param amountRed the red balance to transfer
     * @param resultTransactionsCallback a function to consume the result transactions of this request
     * @return {Promise<void>} a promise that resolves to void
     * @throws TransactionRejectedException if the transaction could not be executed
     * @throws CodeExecutionException if the transaction could be executed but led to an exception in the user code in blockchain,
     *                                that is allowed to be thrown by the method
     * @throws TransactionException if the transaction could be executed but led to an exception outside the user code in blockchain,
     *                              or that is not allowed to be thrown by the method
     */
    public async fromPayer(payer: StorageReferenceModel,
                           keysOfPayer: KeyPair,
                           destination: StorageReferenceModel,
                           amount: string,
                           amountRed: string,
                           resultTransactionsCallback?: (resultTransactions: TransactionReferenceModel[]) => void): Promise<void> {

        if (!amount || parseInt(amount) < 1) {
            throw new HotmokaException("Invalid amount. Value must be greater than 1")
        }

        const accountHelper = new AccountHelper(this.remoteNode)
        const signatureAlgorithmOfPayer = await accountHelper.getSignatureAlgorithm(payer)
        const signatureOfPayer = new Signer(signatureAlgorithmOfPayer, keysOfPayer.privateKey)
        let nonceOfPayer = await this.remoteNode.getNonceOf(payer)
        const chainId = await this.remoteNode.getChainId()
        const gasPrice = await this.remoteNode.getGasPrice()
        const takamakaCode = await this.remoteNode.getTakamakaCode()
        const transactions: TransactionReferenceModel[] = []

        const sendAmountRequest = new InstanceMethodCallTransactionRequestModel(
            payer,
            nonceOfPayer,
            chainId,
            SendCoinsHelper._100_000.toString(),
            gasPrice,
            takamakaCode,
            CodeSignature.RECEIVE_BIG_INTEGER,
            destination,
            [StorageValueModel.newStorageValue(amount, ClassType.BIG_INTEGER.name)],
            signatureOfPayer
        )
        await this.remoteNode.addInstanceMethodCallTransaction(sendAmountRequest)

        if (resultTransactionsCallback) {
            const sendAmountTransaction = sendAmountRequest.getReference(sendAmountRequest.signature)
            if (sendAmountTransaction) {
                transactions.push(sendAmountTransaction)
            }
        }

        if (amountRed && parseInt(amountRed) > 0) {
            nonceOfPayer = await this.remoteNode.getNonceOf(payer)
            const sendAmountRedRequest = new InstanceMethodCallTransactionRequestModel(
                payer,
                nonceOfPayer,
                chainId,
                SendCoinsHelper._100_000.toString(),
                gasPrice,
                takamakaCode,
                CodeSignature.RECEIVE_RED_BIG_INTEGER,
                destination,
                [StorageValueModel.newStorageValue(amountRed, ClassType.BIG_INTEGER.name)],
                signatureOfPayer
            )

            await this.remoteNode.addInstanceMethodCallTransaction(sendAmountRedRequest)
            if (resultTransactionsCallback) {
                const sendAmountRedTransaction = sendAmountRedRequest.getReference(sendAmountRedRequest.signature)
                if (sendAmountRedTransaction) {
                    transactions.push(sendAmountRedTransaction)
                }
            }
        }

        resultTransactionsCallback?.(transactions)
    }

    /**
     * Sends coins to an account, by letting the faucet of the node pay.
     * @param destination the destination account
     * @param amount the balance to transfer
     * @param amountRed the red balance to transfer
     * @param resultTransactionCallback a function to consume the result transaction of this request
     * @return {Promise<void>} a promise that resolves to void
     * @throws TransactionRejectedException if the transaction could not be executed
     * @throws CodeExecutionException if the transaction could be executed but led to an exception in the user code in blockchain,
     *                                that is allowed to be thrown by the method
     * @throws TransactionException if the transaction could be executed but led to an exception outside the user code in blockchain,
     *                              or that is not allowed to be thrown by the method
     */
    public async fromFaucet(destination: StorageReferenceModel, amount: string, amountRed: string, resultTransactionCallback?: (resultTransaction: TransactionReferenceModel | null) => void): Promise<void> {

        const takamakaCode = await this.remoteNode.getTakamakaCode()
        const gamete = await this.remoteNode.getGamete()
        const nonceOfGamete = await this.remoteNode.getNonceOf(gamete)
        const chainId = await this.remoteNode.getChainId()
        const gasPrice = await this.remoteNode.getGasPrice()

        const request = new InstanceMethodCallTransactionRequestModel(
            gamete,
            nonceOfGamete,
            chainId,
            SendCoinsHelper._100_000.toString(),
            gasPrice,
            takamakaCode,
            new VoidMethodSignatureModel(ClassType.GAMETE.name, "faucet",[ClassType.PAYABLE_CONTRACT.name, ClassType.BIG_INTEGER.name, ClassType.BIG_INTEGER.name]),
            gamete,
            [
                StorageValueModel.newReference(destination),
                StorageValueModel.newStorageValue(amount, ClassType.BIG_INTEGER.name),
                StorageValueModel.newStorageValue(amountRed, ClassType.BIG_INTEGER.name)
            ]
        )
        await this.remoteNode.addInstanceMethodCallTransaction(request)

        resultTransactionCallback?.(request.getReference(request.signature))
    }
}