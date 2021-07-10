import { InfoModel } from "../models/info/InfoModel";
import { RemoteNode } from "./RemoteNode";
export declare class ManifestHelper {
    private remoteNode;
    constructor(remoteNode: RemoteNode);
    info(): Promise<InfoModel>;
    private buildInstanceMethodCallTransactionModel;
    private getValidator;
}
