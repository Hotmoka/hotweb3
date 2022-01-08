import {AccountHelper, Bip39Dictionary, StorageReferenceModel, TransactionReferenceModel} from "../src";
import * as fs from "fs";
import * as path from "path"

export const HOTMOKA_VERSION = '1.0.7'
export const CHAIN_ID = "marabunta"
export const EOA = new StorageReferenceModel(new TransactionReferenceModel("local", "9bdf501c339577e101494c49c2d684a4742649c7a7d07928227c7391804f1e5b"), "0")
export const REMOTE_NODE_URL = "http://panarea.hotmoka.io"

export const getPrivateKey = (): string => {
    const keyPair = AccountHelper.generateEd25519KeyPairFrom(
        'hello',
        Bip39Dictionary.ENGLISH,
        Buffer.from('O4Yi3M5vA/82uB4TQMSEqg==', 'base64').toString('hex')
    )
    return keyPair.privateKey
}

export const getLocalJar = (jarName: string): Buffer => {
    return fs.readFileSync(
        path.join(
            __dirname,
            "./jars/" + jarName
        )
    )
}