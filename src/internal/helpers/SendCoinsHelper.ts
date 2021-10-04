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
     */
    public async fromPayer(payer: StorageReferenceModel, keysOfPayer: KeyPair, destination: StorageReferenceModel, amount: string, amountRed: string) {
        if (!amount || parseInt(amount) < 1) {
            throw new HotmokaException("Invalid amount")
        }

        const accountHelper = new AccountHelper(this.remoteNode)
        const signatureAlgorithmOfPayer = await accountHelper.getSignatureAlgorithm(payer)
        const signatureOfPayer = new Signer(signatureAlgorithmOfPayer, keysOfPayer.privateKey)
        const nonceOfPayer = await this.remoteNode.getNonceOf(payer)
        const chainId = await this.remoteNode.getChainId()
        const gasPrice = await this.remoteNode.getGasPrice()
        const takamakaCode = await this.remoteNode.getTakamakaCode()

        await this.sendCoins(payer,
            nonceOfPayer,
            chainId,
            gasPrice,
            takamakaCode,
            destination,
            amount,
            signatureOfPayer)

        if (amountRed && parseInt(amountRed) > 0) {
            await this.sendCoins(payer,
                nonceOfPayer,
                chainId,
                gasPrice,
                takamakaCode,
                destination,
                amountRed,
                signatureOfPayer)
        }
    }

    /**
     * Sends coins to an account, by letting the faucet of the node pay.
     * @param destination the destination account
     * @param amount the balance to transfer
     * @param amountRed the red balance to transfer
     */
    public async fromFaucet(destination: StorageReferenceModel, amount: string, amountRed: string) {

        const takamakaCode = await this.remoteNode.getTakamakaCode()
        const gamete = await this.remoteNode.getGamete()
        const nonceOfGamete = await this.remoteNode.getNonceOf(gamete)
        const chainId = await this.remoteNode.getChainId()
        const gasPrice = await this.remoteNode.getGasPrice()

        await this.remoteNode.addInstanceMethodCallTransaction(new InstanceMethodCallTransactionRequestModel(
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
        ))
    }

    private sendCoins(payer: StorageReferenceModel,
                           nonceOfPayer: string,
                           chainId: string,
                           gasPrice: string,
                           takamakaCode: TransactionReferenceModel,
                           destination: StorageReferenceModel,
                           amount: string,
                           signatureOfPayer: Signer) {
        return this.remoteNode.addInstanceMethodCallTransaction(new InstanceMethodCallTransactionRequestModel(
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
        ))
    }
}