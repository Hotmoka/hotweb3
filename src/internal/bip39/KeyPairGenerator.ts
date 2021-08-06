import {eddsa} from "elliptic";
import {Bip39} from "./Bip39";
import {Buffer} from "buffer";
import {pbkdf2Sync, randomBytes} from "crypto";
import {KeyPair} from "./KeyPair";
import {HotmokaException} from "../exceptions/HotmokaException";
import {Bip39Dictionary} from "./Bip39Dictionary";

export class KeyPairGenerator {

    /**
     * Creates a {@link KeyPair} from the given password, BIP39 dictionary and entropy
     * @param password the password
     * @param bip39Dictionary the bip39 dictionary to use. Available options: "english"
     * @param entropy the optional entropy. It will use a random 16 bytes entropy if not provided.
     * @return a {@link KeyPair}
     */
    public static generateEd25519KeyPair(password: string, bip39Dictionary: Bip39Dictionary, entropy?: Buffer): KeyPair {
        const ec = new eddsa('ed25519')

        const entropyBuff = entropy ? entropy : KeyPairGenerator.generateEntropy()
        if (entropyBuff.length < 16 || entropyBuff.length > 32) {
            throw new HotmokaException("Invalid entropy")
        }

        const entropyHex = entropyBuff.toString('hex')
        const mnemonic = new Bip39({dictionary: bip39Dictionary, entropy: entropyHex}).getMnemonic()
        const salt = "mnemonic" + password

        // generate seed
        const mnemonicBuffer = Buffer.from(KeyPairGenerator.normalize(mnemonic))
        const saltBuffer = Buffer.from(KeyPairGenerator.normalize(salt))
        const seed = pbkdf2Sync(mnemonicBuffer, saltBuffer, 2048, 64, 'sha512')

        // we need a key from seed
        const keyFromSeed = ec.keyFromSecret(seed)

        // we need a 32 bytes key
        const keyPair = ec.keyFromSecret(keyFromSeed.getSecret().slice(0, 32))

        return new KeyPair(
            Buffer.from(keyPair.getSecret()).toString('base64'),
            Buffer.from(keyPair.getPublic()).toString('base64'),
            entropyHex
        )
    }

    /**
     * It generates a 16 bytes entropy.
     * @return the entropy encoded in hex
     */
    private static generateEntropy(): Buffer {
        return randomBytes(16)
    }

    private static normalize(str:string): string {
        return (str || '').normalize('NFKD');
    }
}