import { MethodSignatureModel } from "./MethodSignatureModel";
import { MarshallingContext } from "../../internal/marshalling/MarshallingContext";
export declare class VoidMethodSignatureModel extends MethodSignatureModel {
    /**
     * The method {@code reward} of the validators contract.
     */
    static readonly VALIDATORS_REWARD: VoidMethodSignatureModel;
    equals(other: any): boolean;
    into(context: MarshallingContext): void;
}
