import {AccountHelper, Bip39Dictionary, StorageReferenceModel, TransactionReferenceModel} from "../src";
import * as fs from "fs";
import * as path from "path"

export const HOTMOKA_VERSION = '1.0.8'
export const CHAIN_ID = "marabunta"
export const EOA = new StorageReferenceModel(new TransactionReferenceModel("local", "847a5a499a06abf2ba1b57dba69bcb96cc1ba9e7d17730dd417510d9e4304c33"), "0")
export const REMOTE_NODE_URL = "http://panarea.hotmoka.io"

export const getPrivateKey = (): string => {
    const keyPair = AccountHelper.generateEd25519KeyPairFrom(
        'hello',
        Bip39Dictionary.ENGLISH,
        Buffer.from('XxOvdfIOAh0MljrqiBCszA==', 'base64').toString('hex')
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