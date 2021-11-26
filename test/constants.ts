import {AccountHelper, Bip39Dictionary, StorageReferenceModel, TransactionReferenceModel} from "../src";
import * as fs from "fs";
import * as path from "path"

export const HOTMOKA_VERSION = '1.0.5'
export const CHAIN_ID = "chain-btmZzq"
export const EOA = new StorageReferenceModel(new TransactionReferenceModel("local", "f9afd26c10e28c376f29392d112240b31ecba4cb3df202834dd4e8e8a4b735e5"), "0")
export const REMOTE_NODE_URL = "http://panarea.hotmoka.io"

export const getPrivateKey = (): string => {
    const keyPair = AccountHelper.generateEd25519KeyPairFrom(
        'mysecret',
        Bip39Dictionary.ENGLISH,
        '64ea6e847fd7c3c5403871f9e57d9f48'
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