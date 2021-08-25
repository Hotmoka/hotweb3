import {expect} from 'chai';
import {Bip39} from "../src/internal/bip39/Bip39";
import {AccountHelper} from "../src";
import {Bip39Dictionary} from "../src";
import {RemoteNode} from "../src";
import {Base58} from "../src/internal/bip39/Base58";

describe('Testing Base58', () => {

    it('it should encode bytes to base58 string', async () => {
        const encoded = Base58.encode(Buffer.from('helloworld124'))
        expect(encoded).to.eql('9hLF3DCKexERxQyEQT')
    })

    it('it should decode a base58 string', async () => {
        const decoded = Base58.decode('9hLF3DCKexERxQyEQT')
        expect(decoded).to.eql(Buffer.from('helloworld124'))
    })
})

describe('Testing Bip39', () => {

    it('it should build a valid mnemonic from the given entropy 1', async () => {
        const mnemonic = new Bip39({dictionary: Bip39Dictionary.ENGLISH, entropy: 'ab387d5e490b77c2215777c772084204'}).getMnemonic()
        expect(mnemonic).to.eql('private sentence fiscal must resist three luxury upon shuffle motion awesome antique')
    })

    it('it should build a valid mnemonic from the given entropy 2', async () => {
        const mnemonic = new Bip39({dictionary: Bip39Dictionary.ENGLISH, entropy: '6a30af20d986e36cc8f4a5e58e6943b0'}).getMnemonic()
        expect(mnemonic).to.eql('health lyrics sight reason hotel reopen cat net tortoise infant extend giggle')
    })

    it('it should build a valid mnemonic from the given entropy and account hash', async () => {
        const mnemonic = new Bip39({dictionary: Bip39Dictionary.ENGLISH, entropy: '8813550169346000cba90c3e690d6393', hashOfTransactionReference: '782905b414b296df4b90a15ade21f4914e30325f5f499f7223fcd607f521929f'}).getMnemonic()
        expect(mnemonic).to.eql('marine one doctor sponsor ecology about concert canoe dinosaur embody' +
            ' flight cheap little lizard space north nothing where tomorrow dress pupil axis spoil clap coral' +
            ' napkin style nasty warm ball viable science vivid arrive pony hire')
    })

    it('it should build a valid account from the given mnemonic', async () => {
        const mnemonic = ["marine", "one", "doctor", "sponsor", "ecology", "about", "concert", "canoe",
            "dinosaur", "embody", "flight", "cheap", "little", "lizard", "space", "north", "nothing", "where", "tomorrow",
            "dress", "pupil", "axis", "spoil", "clap", "coral", "napkin", "style", "nasty", "warm", "ball", "viable", "science",
            "vivid", "arrive", "pony", "hire"
        ].join(' ')
        const account = new Bip39({dictionary: Bip39Dictionary.ENGLISH, mnemonic: mnemonic}).getAccount()
        expect(account.entropy).to.eql('8813550169346000cba90c3e690d6393')
        expect(account.storageReference.transaction.hash).to.eql('782905b414b296df4b90a15ade21f4914e30325f5f499f7223fcd607f521929f')
    })

})


describe('Testing AccountHelper', () => {

    it('it should build a valid account from the given mnemonic and password', async () => {
        const keyPair = new AccountHelper(new RemoteNode('')).generateEd25519KeyPairFrom('VERONA', Bip39Dictionary.ENGLISH, Buffer.from('8813550169346000cba90c3e690d6393', 'hex'))
        expect(keyPair.entropy).to.eql('8813550169346000cba90c3e690d6393')
        expect(keyPair.privateKey).to.eql('A6TmXgYRCQOb1w9wRPyRjmOd5cMbUbJDQhdv3xMF0cc=')
        expect(keyPair.publicKey).to.eql('LLsyS8F5YToc0uB/yZqgf+fRnHy9r6BfArqVsGU0GC4=')
    })

    it('it should build a valid account from the given mnemonic and password', async () => {
        const mnemonic = ["marine", "one", "doctor", "sponsor", "ecology", "about", "concert", "canoe",
            "dinosaur", "embody", "flight", "cheap", "little", "lizard", "space", "north", "nothing", "where", "tomorrow",
            "dress", "pupil", "axis", "spoil", "clap", "coral", "napkin", "style", "nasty", "warm", "ball", "viable", "science",
            "vivid", "arrive", "pony", "hire"
        ].join(' ')

        const account = new AccountHelper(new RemoteNode('')).generateAccountFrom('VERONA', mnemonic, Bip39Dictionary.ENGLISH)
        expect(account.entropy).to.eql('8813550169346000cba90c3e690d6393')
        expect(account.storageReference.transaction.hash).to.eql('782905b414b296df4b90a15ade21f4914e30325f5f499f7223fcd607f521929f')
    })

})