import { NonInitialTransactionRequestModel } from "./NonInitialTransactionRequestModel";
import { TransactionReferenceModel } from "../values/TransactionReferenceModel";
import { StorageReferenceModel } from "../values/StorageReferenceModel";
import { MarshallingContext } from "../../marshalling/MarshallingContext";
import { Signature } from "../../signature/Signature";
/**
 * The model of a jar store transaction request.
 */
export declare class JarStoreTransactionRequestModel extends NonInitialTransactionRequestModel {
    jar: string;
    dependencies: Array<TransactionReferenceModel>;
    chainId: string;
    signature: string;
    constructor(caller: StorageReferenceModel, nonce: string, classpath: TransactionReferenceModel, gasLimit: string, gasPrice: string, jar: string, dependencies: Array<TransactionReferenceModel>, chainId: string, signature?: Signature);
    into(context: MarshallingContext): void;
    protected intoWithoutSignature(context: MarshallingContext): void;
}
