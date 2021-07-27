import {RemoteNode} from "../RemoteNode";
import {eddsa} from "elliptic";
import {Buffer} from "buffer";
import {createHash, randomBytes} from "crypto";
import {StorageReferenceModel} from "../models/values/StorageReferenceModel";
import {TransactionReferenceModel} from "../models/values/TransactionReferenceModel";

export class AccountCreationHelper {
    private readonly remoteNode: RemoteNode

    /**
     * Builds an object that helps with the creation of new accounts.
     * @param remoteNode the remote node
     */
    constructor(remoteNode: RemoteNode) {
        this.remoteNode = remoteNode
    }

    async createEd25519Account(password: string): Promise<StorageReferenceModel> {
        const entropy = randomBytes(32)
        const pwd = Buffer.from(password)

        const keyPair = AccountCreationHelper.generateEd25519KeyPair(entropy, pwd)
        const publicKey = Buffer.from(keyPair.getPublic()).toString('base64')
        // TODO
        return Promise.resolve(new StorageReferenceModel(new TransactionReferenceModel("local", ""), ""))
    }

    /**
     * Creates a key pair from the given entropy and password.
     * @param entropy random bytes
     * @param password data that gets hashed into the entropy to get the private key data
     * @return the key pair derived from entropy and password
     */
    private static generateEd25519KeyPair(entropy: Buffer, password: Buffer): eddsa.KeyPair {
        const ec = new eddsa('ed25519')
        const entropyWithPwd = Buffer.concat([entropy, password])
        const hash = createHash('sha256')
        hash.update(entropyWithPwd)
        const random = hash.digest('hex')

        return ec.keyFromSecret(Buffer.from(random, 'hex'))
    }

}