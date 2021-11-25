import {StorageReferenceModel, TransactionReferenceModel} from "../src";
import * as fs from "fs";
import * as path from "path"

export const HOTMOKA_VERSION = '1.0.5'
export const CHAIN_ID = "chain-btmZzq"
export const EOA = new StorageReferenceModel(new TransactionReferenceModel("local", "42e7860ecd335a9411fb6507b8e08a02b3dd77493ff13ea65993b983502c4958"), "0")
export const REMOTE_NODE_URL = "http://panarea.hotmoka.io"

export const getPrivateKey = (pathFile: string): string => {
    return fs.readFileSync(path.resolve(pathFile), "utf8");
}