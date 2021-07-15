import {ConstructorSignatureModel} from "../signatures/ConstructorSignatureModel";
import {StorageReferenceModel} from "../values/StorageReferenceModel";
import {TransactionReferenceModel} from "../values/TransactionReferenceModel";
import {StorageValueModel} from "../values/StorageValueModel";
import {MarshallingContext} from "../../marshalling/MarshallingContext";
import {CodeExecutionTransactionRequestModel} from "./CodeExecutionTransactionRequestModel";
import {Selectors} from "../../marshalling/Selectors";
import {Signer} from "../../signature/Signer";
import {HotmokaException} from "../../exceptions/HotmokaException";

/**
 * A request for calling a constructor of a storage class in a node.
 */
export class ConstructorCallTransactionRequestModel extends CodeExecutionTransactionRequestModel {
    /**
     * The signature of the constructor to call.
     */
    constructorSignature: ConstructorSignatureModel

    /**
     * The chain identifier where this request can be executed, to forbid transaction replay across chains.
     */
    chainId: string

    /**
     * The signature of the request.
     */
    signature: string

    /**
     * A request for calling a constructor of a storage class in a node.
     * It builds the transaction request.
     * @param caller the externally owned caller contract that pays for the transaction
     * @param nonce the nonce used for transaction ordering and to forbid transaction replay; it is relative to the caller
     * @param chainId the chain identifier where this request can be executed, to forbid transaction replay across chains
     * @param gasLimit the maximal amount of gas that can be consumed by the transaction
     * @param gasPrice the coins payed for each unit of gas consumed by the transaction
     * @param classpath the class path where the caller can be interpreted and the code must be executed
     * @param constructorSignature the signature of constructor that must be called
     * @param actuals the actual arguments passed to the constructor
     * @param signer the optional signer of the request
     * @throws HotmokaException if errors occur
     */
    constructor(caller: StorageReferenceModel,
                nonce: string,
                chainId: string,
                gasLimit: string,
                gasPrice: string,
                classpath: TransactionReferenceModel,
                constructorSignature: ConstructorSignatureModel,
                actuals: Array<StorageValueModel>,
                signer?: Signer
    ) {
        super(caller, nonce, classpath, gasLimit, gasPrice, actuals)

        if (constructorSignature === null || constructorSignature === undefined) {
            throw new HotmokaException("constructor signature cannot be null or undefined")
        }

        const formalsLength = constructorSignature.formals ? constructorSignature.formals.length : 0
        const actualsLength = actuals ? actuals.length : 0

        if (formalsLength !== actualsLength) {
            throw new HotmokaException("argument count mismatch between formals and actuals")
        }

        if (chainId === null || chainId === undefined) {
            throw new HotmokaException("chainId cannot be null or undefined")
        }

        this.constructorSignature = constructorSignature
        this.chainId = chainId
        this.signature = signer ? signer.sign(this.marshall()) : ''
    }

    /**
     * It marshals this object into a stream.
     * @param context hte context holding the stream
     */
    public into(context: MarshallingContext): void {
        this.intoWithoutSignature(context)
    }

    protected intoWithoutSignature(context: MarshallingContext): void {
        context.writeByte(Selectors.SELECTOR_CONSTRUCTOR_CALL)
        context.writeString(this.chainId)
        super.intoWithoutSignature(context)
        this.constructorSignature.into(context)
    }
}