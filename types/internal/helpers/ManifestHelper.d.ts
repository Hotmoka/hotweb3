import { InfoModel } from "../models/info/InfoModel";
import { RemoteNode } from "../RemoteNode";
/**
 * Helper class to get information about the remote Hotmoka node.
 */
export declare class ManifestHelper {
    private readonly remoteNode;
    constructor(remoteNode: RemoteNode);
    /**
     * Yields the info of a remote node.
     * @return the info of the node
     */
    info(): Promise<InfoModel>;
    private buildInstanceMethodCallTransactionModel;
    private getValidator;
}
