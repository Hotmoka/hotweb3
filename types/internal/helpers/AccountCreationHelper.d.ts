import { RemoteNode } from "../RemoteNode";
import { StorageReferenceModel } from "../models/values/StorageReferenceModel";
export declare class AccountCreationHelper {
    private readonly remoteNode;
    /**
     * Builds an object that helps with the creation of new accounts.
     * @param remoteNode the remote node
     */
    constructor(remoteNode: RemoteNode);
    createEd25519Account(password: string): Promise<StorageReferenceModel>;
    /**
     * Creates a key pair from the given entropy and password.
     * @param entropy random bytes
     * @param password data that gets hashed into the entropy to get the private key data
     * @return the key pair derived from entropy and password
     */
    private static generateEd25519KeyPair;
}
