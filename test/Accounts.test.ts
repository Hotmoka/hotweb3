import {assert, expect} from 'chai';
import {Bip39} from "../src/internal/bip39/Bip39";
import {
    AccountHelper,
    Bip39Dictionary,
    Base58,
    RemoteNode,
    TransactionReferenceModel,
    KeyPair,
    StorageValueModel,
    Algorithm,
    InstanceMethodCallTransactionRequestModel,
    TransactionRestResponseModel,
    MethodCallTransactionSuccessfulResponseModel
} from "../src";
import {REMOTE_NODE_URL} from "./constants";
import {TransactionRestRequestModel} from "../src/internal/models/requests/TransactionRestRequestModel";

describe('Testing Base58', () => {

    it('it should decode a base58 string', async () => {
        const decoded = Base58.decode('9hLF3DCKexERxQyEQT')
        expect(decoded).to.eql(Buffer.from('helloworld124'))
    })

    it('it should encode a ed25519 publicKey', async () => {
        const encoded = Base58.encode('Goy0mEM97sWRuTdNDxUyJ/gYAnn9FPuWi3FsPeQsLNo=')
        expect(encoded).to.eql('2ne3N6WvJaBLRR3wSZXhW4z88WMYbq5U2NwKjoSmEwQd')
    })

    it('it should encode a ed25519 publicKey', async () => {
        const encoded = Base58.encode('PtOjX/Ae7RzPr0hFB8wInoefm9+S3rAj3QZKhWy+qlI=')
        expect(encoded).to.eql('5EFTAeNkPSQGc8YSFXbZ2oH8BPAymYzsXWyJTmysTEUq')
    })

    it('it should decode a base58 public key o a ed25519 publicKey', async () => {
        const decoded = Base58.decode('5EFTAeNkPSQGc8YSFXbZ2oH8BPAymYzsXWyJTmysTEUq')
        expect(decoded.toString('base64')).to.eql('PtOjX/Ae7RzPr0hFB8wInoefm9+S3rAj3QZKhWy+qlI=')
    })

    it('it should decode a base58 publicKey to a ed25519 publicKey', async () => {
        const decoded = Base58.decode('QE8P6XyPoDEob4LZ6tkxDcT596QJBsE7C9HuWJFAfnAERtwfw7qSuX5JqSvg')
        expect(decoded.toString('base64')).to.eql('R295MG1FTTk3c1dSdVRkTkR4VXlKL2dZQW5uOUZQdVdpM0ZzUGVRc0xObz0=')
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
        expect(account.reference).to.be.not.undefined
        expect(account.reference?.transaction.hash).to.eql('782905b414b296df4b90a15ade21f4914e30325f5f499f7223fcd607f521929f')
    })

})


describe('Testing AccountHelper', () => {

    it('it should verify that a base58 public key can be decode to a valid ed25519 public key', async () => {
        const isPublicKey = AccountHelper.isEd25519PublicKey('5e6WhvAzBwStgY27BPhvk7J8Bzu5S8wFdhfdSQsYKSZj')
        expect(isPublicKey).to.be.true
    })


    it('it should build a valid keypair the given password and entropy', async () => {
        const keyPair = AccountHelper.generateEd25519KeyPairFrom(
            'VERONA',
            Bip39Dictionary.ENGLISH,
            '8813550169346000cba90c3e690d6393'
        )

        expect(keyPair.entropy).to.eql('8813550169346000cba90c3e690d6393')
        expect(keyPair.privateKey).to.eql('A6TmXgYRCQOb1w9wRPyRjmOd5cMbUbJDQhdv3xMF0cc=')
        expect(keyPair.publicKey).to.eql('LLsyS8F5YToc0uB/yZqgf+fRnHy9r6BfArqVsGU0GC4=')
    })

    it('it should build a valid account from the given mnemonic', async () => {
        const mnemonic = ["marine", "one", "doctor", "sponsor", "ecology", "about", "concert", "canoe",
            "dinosaur", "embody", "flight", "cheap", "little", "lizard", "space", "north", "nothing", "where", "tomorrow",
            "dress", "pupil", "axis", "spoil", "clap", "coral", "napkin", "style", "nasty", "warm", "ball", "viable", "science",
            "vivid", "arrive", "pony", "hire"
        ].join(' ')

        const account =  new Bip39({dictionary: Bip39Dictionary.ENGLISH, mnemonic: mnemonic}).getAccount()
        expect(account.entropy).to.eql('8813550169346000cba90c3e690d6393')
        expect(account.reference).to.be.not.undefined
        expect(account.reference?.transaction.hash).to.eql('782905b414b296df4b90a15ade21f4914e30325f5f499f7223fcd607f521929f')
    })

    it('it should build a valid account from the given mnemonic 2', async () => {
        const mnemonic = "gossip fat patient zero label tired abstract athlete wheat cloud guitar music online truck raccoon brisk method rocket ski inch speed muffin actress glow slight chaos sorry tomato choice plunge father brown pigeon rifle junk cheap"

        const account =  new Bip39({dictionary: Bip39Dictionary.ENGLISH, mnemonic: mnemonic}).getAccount()
        expect(account.entropy).to.eql('64ea6e847fd7c3c5403871f9e57d9f48')
        expect(account.reference).to.be.not.undefined
        expect(account.reference?.transaction.hash).to.eql('f9afd26c10e28c376f29392d112240b31ecba4cb3df202834dd4e8e8a4b735e5')
    })

    it('it should build a valid account from the given mnemonic 3', async () => {
        const mnemonic = "session dismiss play above twenty donkey where magnet middle tennis hospital dawn define worth brain mass blossom process tell half bronze shoe powder neutral level extend person acquire earn spatial news talk awesome youth cruel luxury"

        const account =  new Bip39({dictionary: Bip39Dictionary.ENGLISH, mnemonic: mnemonic}).getAccount()
        expect(account.entropy).to.eql('c447ea99004eb2827e942f8c5be5b79b')
        expect(account.reference).to.be.not.undefined
        expect(account.reference?.transaction.hash).to.eql('f399fbc6bc441815737b3431cb8cea4ca780aa1e8d011455a1254eec109fecd2')
    })

    it('it should reconstruct the 36 mnemonic words from the given entropy and storage reference', async () => {
        const words = AccountHelper.generateMnemonicWordsFrom(
            '8813550169346000cba90c3e690d6393',
            '782905b414b296df4b90a15ade21f4914e30325f5f499f7223fcd607f521929f',
            Bip39Dictionary.ENGLISH
        )

        expect(words).to.eql(["marine", "one", "doctor", "sponsor", "ecology", "about", "concert", "canoe",
            "dinosaur", "embody", "flight", "cheap", "little", "lizard", "space", "north", "nothing", "where", "tomorrow",
            "dress", "pupil", "axis", "spoil", "clap", "coral", "napkin", "style", "nasty", "warm", "ball", "viable", "science",
            "vivid", "arrive", "pony", "hire"
        ])
    })


    it.skip('it should return the storage reference of a public key from the accounts ledger', async () => {
        const accountsHelper = new AccountHelper(new RemoteNode(REMOTE_NODE_URL))
        const reference = await accountsHelper.getReferenceFromAccountsLedger("5e6WhvAzBwStgY27BPhvk7J8Bzu5S8wFdhfdSQsYKSZj")

        expect(reference).to.be.not.null
        expect(reference!.transaction.hash).to.eql("64a4e9991e04847d6582a5b5bb953efea439d60f1f94f91a89a416b315991b78")
    })

    it('it should return null for a public key that is not binded to the accounts ledger', async () => {
        const accountsHelper = new AccountHelper(new RemoteNode(REMOTE_NODE_URL))
        const result = await accountsHelper.getReferenceFromAccountsLedger("AMVhQoVf3j13pYWuZduazpCEWzRfvzkNGUreJKmmboDp")

        expect(result).to.be.null
    })

})


describe('Testing the account creation of hotmoka', () => {
    let accountCreationTransaction: TransactionReferenceModel | null = null
    let keyPair: KeyPair
    let account: StorageValueModel
    const password = "pippo"

    it('it should create a hotmoka account from faucet', async () => {
        const accountHelper = new AccountHelper(new RemoteNode(REMOTE_NODE_URL))
        keyPair = AccountHelper.generateEd25519KeyPairFrom(password, Bip39Dictionary.ENGLISH)

        account = await accountHelper.createAccountFromFaucet(
            Algorithm.ED25519,
            keyPair,
            "2",
            "0",
            resultTransaction => accountCreationTransaction = resultTransaction
        )
        expect(account).to.be.not.undefined
        expect(accountCreationTransaction).to.be.not.null

        if (!account.reference) {
            assert.fail('account reference should be defined')
        }
        expect(account.reference.transaction).to.be.not.undefined
        expect(account.reference.transaction.hash).to.be.not.undefined
        expect(account.reference.transaction.type).to.be.eq('local')

    }).timeout(40000)

    it('it should return a valid request for the transaction reference of the account created', async () => {
        if (!accountCreationTransaction) {
            assert.fail('transaction reference should be defined')
        }

        const remoteNode = new RemoteNode(REMOTE_NODE_URL)
        const result: TransactionRestRequestModel<unknown> = await remoteNode.getRequestAt(accountCreationTransaction)
        expect(result).to.be.not.null
        expect(result).to.be.not.undefined

        const request = result.transactionRequestModel as InstanceMethodCallTransactionRequestModel
        expect(request).to.be.not.null
        expect(request.method).to.be.not.null
        expect(request.method.methodName).to.be.not.null
        expect(request.method.methodName).to.be.eql('faucetED25519')

    }).timeout(10000)

    it('it should return a valid response for the transaction reference of the account created', async () => {
        if (!accountCreationTransaction) {
            assert.fail('transaction reference should be defined')
        }

        const remoteNode = new RemoteNode(REMOTE_NODE_URL)
        const result: TransactionRestResponseModel<unknown> = await remoteNode.getResponseAt(accountCreationTransaction)
        expect(result).to.be.not.null
        expect(result).to.be.not.undefined

        const response = result.transactionResponseModel as MethodCallTransactionSuccessfulResponseModel
        expect(response).to.be.not.null
        expect(response.result).to.be.not.null
        expect(response.result.reference).to.be.not.null

    }).timeout(10000)

    it('it should verify correctly the created public key in the node', async () => {
        const accountHelper = new AccountHelper(new RemoteNode(REMOTE_NODE_URL))
        if (!account.reference) {
            assert.fail('account reference is undefined')
        }
        const isVerified = await accountHelper.verifyAccount(account.reference, keyPair.publicKey)
        expect(isVerified).to.eql(true)
    })

    it('it should fail verifying the created public key in the node when providing a wrong public key', async () => {
        const accountHelper = new AccountHelper(new RemoteNode(REMOTE_NODE_URL))
        if (!account.reference) {
            assert.fail('account reference is undefined')
        }
        const isVerified = await accountHelper.verifyAccount(account.reference, '_' + keyPair.publicKey.substr(1))
        expect(isVerified).to.eql(false)
    })
})
