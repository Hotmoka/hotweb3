import {createHash} from "crypto";
import {HotmokaException} from "../exceptions/HotmokaException";
import {Buffer} from "buffer";
import {Account} from "../models/Account";
import {Bip39Params} from "./Bip39Params";
import {getDictionary} from "./Bip39DictionaryWords";
import {StorageReferenceModel} from "../models/values/StorageReferenceModel";

export class Bip39 {
    private readonly dictionary: Array<string>
    private readonly words: Array<string>

    /**
     * BIP39 implementation from the given {@link Bip39Params} params.
     * @param params the BIP39 params
     */
    constructor(params: Bip39Params) {
        this.dictionary = getDictionary(params.dictionary)

        if (params.mnemonic) {
            this.words = params.mnemonic.split(' ')
        } else {
            if (!params.entropy) {
                throw new HotmokaException("Entropy not initialized")
            }
            this.words = []
            const bufferEntropy = Buffer.from(params.entropy, 'hex')
            const bufferHashOfTransactionReference = params.hashOfTransactionReference ? Buffer.from(params.hashOfTransactionReference, 'hex') : Buffer.alloc(0)
            this.generateWords(Buffer.concat([bufferEntropy, bufferHashOfTransactionReference]))
        }
    }

    /**
     * It returns the generated mnemonic from the given {@link Bip39Params} params.
     */
    public getMnemonic(): string {
        return this.words.join(' ')
    }

    /**
     * It returns the generated account from the given {@link Bip39Params} params.
     * @return the generated account
     */
    public getAccount(): Account {

        // each mnemonic word represents 11 bits
        const bits = new Array(this.words.length * 11)

        // the transaction hash is always 32 bytes long
        const accountHash = new Array(32)

        const bitsOfChecksum = this.words.length / 3
        const checksum = new Array(bitsOfChecksum)

        // the entropy uses the remaining number of bytes
        const entropy = new Array((bits.length - bitsOfChecksum) / 8 - accountHash.length)

        const startOfTransaction = entropy.length * 8
        const startOfChecksum = startOfTransaction + accountHash.length * 8

        // we transform the mnemonic phrase into a sequence of bits
        let pos = 0;
        this.words.forEach(word => {

            const index = this.dictionary.indexOf(word);
            if (index < 0) {
                throw new HotmokaException(word + " is not a valid mnemonic word")
            }

            // every word accounts for 11 bits
            for (let bit = 0; bit <= 10; bit++) {
                bits[pos++] = (index & (0x400 >>> bit)) !== 0
            }
        })

        // the first startOfTransaction bits are the entropy
        for (pos = 0; pos < startOfTransaction; pos++) {
            if (bits[pos]) {
                entropy[Math.floor(pos / 8)] |= 0x80 >>> (pos % 8)
            }
        }

        // the next (startOfChecksum - startOfTransaction) bits are the transaction reference of the account reference
        for ( ; pos < startOfChecksum; pos++) {
            if (bits[pos]) {
                const temp = pos - startOfTransaction;
                accountHash[Math.floor(temp / 8)] |= 0x80 >>> (temp % 8)
            }
        }

        // the remaining bits are the checksum
        for ( ; pos < bits.length; pos++) {
            checksum[pos - startOfChecksum] = bits[pos]
        }

        const entropyWithAccountHash = Buffer.concat([Buffer.from(entropy), Buffer.from(accountHash)])
        const hash = createHash('sha256')
            .update(entropyWithAccountHash)
            .digest()

        const checksumRecomputed = new Array(bitsOfChecksum)
        for (pos = 0; pos < bitsOfChecksum; pos++) {
            checksumRecomputed[pos] = (hash[pos] & (0x80 >>> (pos % 8))) !== 0
        }

        if (!Bip39.arraysEquals(checksumRecomputed, checksum)) {
            throw new HotmokaException('illegal mnemonic phrase: checksum mismatch')
        }

        return new Account(Buffer.from(entropy).toString('hex'), '','', '0', StorageReferenceModel.newStorageReference(Buffer.from(accountHash).toString('hex'), '0'))
    }

    /**
     * Transforms a sequence of bytes into BIP39 words, including a checksum at its end.
     * @param data the bytes
     */
    private generateWords(data: Buffer): void {

        const hash = createHash('sha256')
            .update(data)
            .digest();

        const dataSizeTimes8 = data.length * 8
        const bits = new Array(dataSizeTimes8 + dataSizeTimes8 / 32)

        // the initial bits are those of data
        for (let pos = 0; pos < dataSizeTimes8; pos++) {
            bits[pos] = (data[Math.floor(pos / 8)] & (0x80 >>> (pos % 8))) !== 0
        }

        // the remaining bits are the first (bits.size - dataSizeTimes8) bits of the sha256 checksum
        for (let pos = dataSizeTimes8; pos < bits.length; pos++) {
            bits[pos] = (hash[pos - dataSizeTimes8] & (0x80 >>> (pos % 8))) !== 0
        }

        for (let pos = 0; pos < bits.length - 10; pos += 11) {
            // we select bits from pos (inclusive) to pos + 11 (exclusive)
            let index = 0
            for (let pos2 = 0; pos2 <= 10; pos2++) {
                if (bits[pos + pos2]) {
                    index = index | (0x0400 >>> pos2)
                }
            }

            this.words.push(this.dictionary[index])
        }
    }

    private static arraysEquals(a: Array<number>, b: Array<number>) {
        if (a == null || b == null) {
            return false
        }

        if (a.length !== b.length) {
            return false;
        }

        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) {
                return false
            }
        }
        return true
    }
}

