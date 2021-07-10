import { TransactionRequestModel } from "./TransactionRequestModel";
import { MarshallingContext } from "../../internal/marshalling/MarshallingContext";
export declare abstract class InitialTransactionRequestModel extends TransactionRequestModel {
    protected into(context: MarshallingContext): void;
}
