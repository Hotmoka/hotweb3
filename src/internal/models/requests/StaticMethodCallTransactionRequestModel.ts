import {MethodCallTransactionRequestModel} from "./MethodCallTransactionRequestModel";
import {StorageReferenceModel} from "../values/StorageReferenceModel";
import {TransactionReferenceModel} from "../values/TransactionReferenceModel";
import {MethodSignatureModel} from "../signatures/MethodSignatureModel";
import {StorageValueModel} from "../values/StorageValueModel";
import {MarshallingContext} from "../../marshalling/MarshallingContext";
import {Selectors} from "../../marshalling/Selectors";
import {Signer} from "../../signature/Signer";
import {HotmokaException} from "../../exception/HotmokaException";
import {Signature} from "../../signature/Signature";

/**
 * A request for calling a static method of a storage class in a node.
 */
export class StaticMethodCallTransactionRequestModel extends MethodCallTransactionRequestModel {
    /**
     * The chain identifier where this request can be executed, to forbid transaction replay across chains.
     */
    chainId: string

    /**
     * The signature of the request.
     */
    signature: string

    /**
     * A request for calling a static method of a storage class in a node.
     * It builds the transaction request.
     * @param caller the externally owned caller contract that pays for the transaction
     * @param nonce the nonce used for transaction ordering and to forbid transaction replay; it is relative to the caller
     * @param chainId the chain identifier where this request can be executed, to forbid transaction replay across chains
     * @param gasLimit the maximal amount of gas that can be consumed by the transaction
     * @param gasPrice the coins payed for each unit of gas consumed by the transaction
     * @param classpath the class path where the caller can be interpreted and the code must be executed
     * @param method the method that must be called
     * @param actuals the actual arguments passed to the method
     * @param signature the optional signer of the request
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
        actuals: Array<StorageValueModel>,
        signature?: Signature
    ) {
        super(caller, nonce, classpath, gasLimit, gasPrice, method, actuals)

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
        context.writeByte(Selectors.SELECTOR_STATIC_METHOD_CALL)
        context.writeString(this.chainId)
        super.intoWithoutSignature(context)
    }
}