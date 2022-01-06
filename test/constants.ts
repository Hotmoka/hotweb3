import {AccountHelper, Bip39Dictionary, StorageReferenceModel, TransactionReferenceModel} from "../src";
import * as fs from "fs";
import * as path from "path"

export const HOTMOKA_VERSION = '1.0.7'
export const CHAIN_ID = "marabunta"
export const EOA = new StorageReferenceModel(new TransactionReferenceModel("local", "54df7d537e8a6eee1fb3a9b76723921ba60bdb22839625bf566f98a61ff686b4"), "0")
export const REMOTE_NODE_URL = "http://panarea.hotmoka.io"

export const getPrivateKey = (): string => {
    const keyPair = AccountHelper.generateEd25519KeyPairFrom(
        'hello',
        Bip39Dictionary.ENGLISH,
        Buffer.from('o2Nl+HScZe3pCiBNe9048w==', 'base64').toString('hex')
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

export const wait = (timeout: number): Promise<void> => new Promise(resolve => setTimeout(() => resolve(), timeout))