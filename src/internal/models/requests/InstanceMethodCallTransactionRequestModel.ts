import {StorageReferenceModel} from "../values/StorageReferenceModel";
import {TransactionReferenceModel} from "../values/TransactionReferenceModel";
import {MethodSignatureModel} from "../signatures/MethodSignatureModel";
import {StorageValueModel} from "../values/StorageValueModel";
import {MarshallingContext} from "../../marshalling/MarshallingContext";
import {CodeSignature} from "../../lang/CodeSignature";
import {Selectors} from "../../marshalling/Selectors";
import {AbstractInstanceMethodCallTransactionRequestModel} from "./AbstractInstanceMethodCallTransactionRequestModel";
import {Signer} from "../../signature/Signer";
import {HotmokaException} from "../../exception/HotmokaException";
import {Signature} from "../../signature/Signature";

/**
 * A request for calling an instance method of a storage object in a node.
 */
export class InstanceMethodCallTransactionRequestModel extends AbstractInstanceMethodCallTransactionRequestModel {
    /**
     * The chain identifier where this request can be executed, to forbid transaction replay across chains.
     */
    chainId: string

    /**
     * The signature of the request.
     */
    signature: string


    /**
     * A request for calling an instance method of a storage object in a node.
     * It builds the transaction request.
     *
     * @param caller the externally owned caller contract that pays for the transaction
     * @param nonce the nonce used for transaction ordering and to forbid transaction replay; it is relative to the caller
     * @param chainId the chain identifier where this request can be executed, to forbid transaction replay across chains
     * @param gasLimit the maximal amount of gas that can be consumed by the transaction
     * @param gasPrice the coins payed for each unit of gas consumed by the transaction
     * @param classpath the class path where the caller can be interpreted and the code must be executed
     * @param method the method that must be called
     * @param receiver the receiver of the call
     * @param actuals the actual arguments passed to the method
     * @param signature the signer of the request
     * @throws HotmokaException if errors occur
     */
    constructor(
        caller: StorageReferenceModel,
        nonce: string,
        chainId: string,
        gasLimit: string,
        gasPrice: string,
        classpath: TransactionReferenceModel,
        method: MethodSignatureModel,
        receiver: StorageReferenceModel,
        actuals: Array<StorageValueModel>,
        signature?: Signature
    ) {
        super(caller, nonce, classpath, gasLimit, gasPrice, method, actuals, receiver)

        if (chainId === null || chainId === undefined) {
            throw new HotmokaException("chainId cannot be null or undefined")
        }

        this.chainId = chainId
        this.signature = signature ? Signer.INSTANCE.sign(signature, this.marshall()) : ''
    }

    /**
     * It marshals this object into a stream.
     * @param context the context holding the stream
     */
    public into(context: MarshallingContext): void {
        this.intoWithoutSignature(context)
    }

    protected intoWithoutSignature(context: MarshallingContext): void {
        const receiveInt = CodeSignature.RECEIVE_INT.equals(this.method)
        const receiveLong = CodeSignature.RECEIVE_LONG.equals(this.method)
        const receiveBigInteger = CodeSignature.RECEIVE_BIG_INTEGER.equals(this.method)

        if (receiveInt) {
            context.writeByte(Selectors.SELECTOR_TRANSFER_INT)
        } else if (receiveLong) {
            context.writeByte(Selectors.SELECTOR_TRANSFER_LONG)
        } else if (receiveBigInteger) {
            context.writeByte(Selectors.SELECTOR_TRANSFER_BIG_INTEGER)
        } else {
            context.writeByte(Selectors.SELECTOR_INSTANCE_METHOD_CALL)
        }

        context.writeString(this.chainId)

        if (receiveInt || receiveLong || receiveBigInteger) {
            StorageReferenceModel.intoWithoutSelector(context, this.caller)
            context.writeBigInteger(this.gasLimit)
            context.writeBigInteger(this.gasPrice)
            TransactionReferenceModel.into(context, this.classpath)
            context.writeBigInteger(this.nonce)
            StorageReferenceModel.intoWithoutSelector(context, this.receiver)

            if (this.actuals.length === 0) {
                throw new Error("Actuals required")
            }

            const howMuch = this.actuals[0]
            if (receiveInt) {
                context.writeInt(Number(howMuch.value))
            } else if (receiveLong) {
                context.writeLong(Number(howMuch.value))
            } else {
                context.writeBigInteger(howMuch.value ?? '0')
            }
        } else {
            super.intoWithoutSignature(context)
        }
    }
}