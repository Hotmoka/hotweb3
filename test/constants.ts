import {AccountHelper, Bip39Dictionary, StorageReferenceModel, TransactionReferenceModel} from "../src";
import * as fs from "fs";
import * as path from "path"

export const HOTMOKA_VERSION = '1.0.6'
export const CHAIN_ID = "marabunta"
export const EOA = new StorageReferenceModel(new TransactionReferenceModel("local", "f399fbc6bc441815737b3431cb8cea4ca780aa1e8d011455a1254eec109fecd2"), "0")
export const REMOTE_NODE_URL = "http://panarea.hotmoka.io"

export const getPrivateKey = (): string => {
    const keyPair = AccountHelper.generateEd25519KeyPairFrom(
        'mypassword',
        Bip39Dictionary.ENGLISH,
        'c447ea99004eb2827e942f8c5be5b79b'
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