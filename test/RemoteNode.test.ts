import {
    AccountHelper,
    Algorithm,
    BasicType,
    Bip39Dictionary,
    ConstructorCallTransactionRequestModel,
    ConstructorCallTransactionSuccessfulResponseModel,
    ConstructorSignatureModel,
    InfoModel,
    InstanceMethodCallTransactionRequestModel,
    JarStoreInitialTransactionResponseModel,
    JarStoreTransactionRequestModel,
    KeyPair,
    MethodCallTransactionSuccessfulResponseModel,
    NonVoidMethodSignatureModel,
    NoSuchElementException,
    RemoteNode,
    SignatureAlgorithmResponseModel,
    Signer,
    StateModel,
    StaticMethodCallTransactionRequestModel,
    StorageReferenceModel,
    StorageValueModel,
    TransactionReferenceModel,
    TransactionRestResponseModel
} from "../src"
import {expect} from 'chai';
import {TransactionRestRequestModel} from "../src/internal/models/requests/TransactionRestRequestModel";
import * as fs from "fs";
import * as path from "path"
import assert = require("assert");


export const HOTMOKA_VERSION = "1.0.4"
const getPrivateKey = (pathFile: string): string => {
    return fs.readFileSync(path.resolve(pathFile), "utf8");
}

const chainId = "chain-btmZzq"
const REMOTE_NODE_URL = "http://panarea.hotmoka.io"
const basicJarClasspath = new TransactionReferenceModel("local", "1a41100fbe283326ad043b4b84d220e820bcded1acaf46b33c86f0aafa0fbd74")
const signer = new Signer(Algorithm.ED25519, getPrivateKey("./test/keys/eoa.pri"))
const EOA = new StorageReferenceModel(new TransactionReferenceModel("local", "42e7860ecd335a9411fb6507b8e08a02b3dd77493ff13ea65993b983502c4958"), "0")
const gasLimit = "500000"


describe('Testing the GET methods of a remote hotmoka node', () => {

    it('getTakamakaCode - it should respond with a valid takamakaCode', async () => {
        const remoteNode = new RemoteNode(REMOTE_NODE_URL)
        const result: TransactionReferenceModel = await remoteNode.getTakamakaCode()
        
        expect(result.hash).to.be.not.null
        expect(result.hash).to.be.have.length.above(10)
    }).timeout(10000)

    it('getManifest - it should respond with a valid manifest', async () => {
        const remoteNode = new RemoteNode(REMOTE_NODE_URL)
        const result: StorageReferenceModel = await remoteNode.getManifest()

        expect(result.transaction).to.be.not.null
        expect(result.transaction.hash).to.be.not.null
        expect(result.transaction.hash).to.be.have.length.above(10)
    }).timeout(10000)

    it('getState - it should respond with a valid state of the manifest', async () => {
        const remoteNode = new RemoteNode(REMOTE_NODE_URL)
        const manifest: StorageReferenceModel = await remoteNode.getManifest()
        const state: StateModel = await remoteNode.getState(manifest)

        expect(state).to.be.not.null
        expect(state.updates).to.be.not.empty
    }).timeout(10000)

    it('getState - it should throw a NoSuchElementException for a non existing object', async () => {
        const remoteNode = new RemoteNode(REMOTE_NODE_URL)

        try {
            await remoteNode.getState(new StorageReferenceModel(new TransactionReferenceModel("local", "66d7d1db2559b628a3e9904f589ed681ca8dbf770995558375e3349c21a516de"), "0"))
            assert.fail("should throw a NoSuchElementException for a non existing object")
        } catch (exception) {
            if (exception instanceof NoSuchElementException) {
                expect(exception.message).to.eql('unknown transaction reference 66d7d1db2559b628a3e9904f589ed681ca8dbf770995558375e3349c21a516de')
            } else {
                assert.fail("should throw a NoSuchElementException for a non existing object")
            }
        }

    }).timeout(10000)

    it('getClassTag - it should throw a HotmokaException for a non existing object', async () => {
        const remoteNode = new RemoteNode(REMOTE_NODE_URL)
        const manifest = await remoteNode.getManifest()
        const classTag = await remoteNode.getClassTag(manifest)

        expect(classTag.className).to.eql('io.takamaka.code.governance.Manifest')
        expect(classTag.jar).to.not.null
        expect(classTag.jar.hash).to.be.not.null
    }).timeout(10000)

    it('getClassTag - it should throw a NoSuchElementException for a non existing object', async () => {
        const remoteNode = new RemoteNode(REMOTE_NODE_URL)

        try {
            await remoteNode.getClassTag(new StorageReferenceModel(new TransactionReferenceModel("local", "66d7d1db2559b628a3e9904f589ed681ca8dbf770995558375e3349c21a516de"), "0"))
            assert.fail("should throw a HotmokaException for a non existing object")
        } catch (exception) {
            if (exception instanceof NoSuchElementException) {
                expect(exception.message).to.eql('unknown transaction reference 66d7d1db2559b628a3e9904f589ed681ca8dbf770995558375e3349c21a516de')
            } else {
                assert.fail("should throw a NoSuchElementException for a non existing object")
            }
        }

    }).timeout(10000)

    it('getRequestAt - it should respond with a valid request for takamakaCode', async () => {
        const remoteNode = new RemoteNode(REMOTE_NODE_URL)

        const takamakaCode: TransactionReferenceModel = await remoteNode.getTakamakaCode()
        const result: TransactionRestRequestModel<unknown> = await remoteNode.getRequestAt(takamakaCode)
        const jarStoreTransaction = result.transactionRequestModel as JarStoreTransactionRequestModel

        expect(result.transactionRequestModel).to.be.not.null
        expect(jarStoreTransaction.jar).to.be.not.null
        expect(result.type).to.be.not.null
        expect(result.type).to.be.eql('io.hotmoka.network.requests.JarStoreInitialTransactionRequestModel')
    }).timeout(10000)

    it('getResponseAt - it should respond with a valid response for takamakaCode', async () => {
        const remoteNode = new RemoteNode(REMOTE_NODE_URL)

        const takamakaCode: TransactionReferenceModel = await remoteNode.getTakamakaCode()
        const result: TransactionRestResponseModel<unknown> = await remoteNode.getResponseAt(takamakaCode)
        const jarStoreInitialTransaction = result.transactionResponseModel as JarStoreInitialTransactionResponseModel

        expect(result.transactionResponseModel).to.be.not.null
        expect(jarStoreInitialTransaction.instrumentedJar).to.be.not.null
        expect(jarStoreInitialTransaction.dependencies.length).to.be.eql(0)
        expect(result.type).to.be.not.null
        expect(result.type).to.be.eql('io.hotmoka.network.responses.JarStoreInitialTransactionResponseModel')
    }).timeout(10000)

    it('getPolledResponseAt - it should respond with a valid polledResponse for takamakaCode', async () => {
        const remoteNode = new RemoteNode(REMOTE_NODE_URL)

        const takamakaCode: TransactionReferenceModel = await remoteNode.getTakamakaCode()
        const result: TransactionRestResponseModel<unknown> = await remoteNode.getPolledResponseAt(takamakaCode)
        const jarStoreInitialTransaction = result.transactionResponseModel as JarStoreInitialTransactionResponseModel

        expect(result.transactionResponseModel).to.be.not.null
        expect(jarStoreInitialTransaction.instrumentedJar).to.be.not.null
        expect(jarStoreInitialTransaction.dependencies.length).to.be.eql(0)
        expect(result.type).to.be.not.null
        expect(result.type).to.be.eql('io.hotmoka.network.responses.JarStoreInitialTransactionResponseModel')
    }).timeout(10000)

    it('getNameOfSignatureAlgorithmForRequests - it should respond with a signature algorithm', async () => {
        const remoteNode = new RemoteNode(REMOTE_NODE_URL)
        const result: SignatureAlgorithmResponseModel = await remoteNode.getNameOfSignatureAlgorithmForRequests()

        expect(result).to.be.not.null
        expect(result.algorithm).to.be.not.null
        expect(result.algorithm).to.be.not.empty
        expect(result.algorithm).to.be.eql(Algorithm[signer.algorithm].toLocaleLowerCase())
    }).timeout(10000)
})


describe('Testing the RUN methods of a remote hotmoka node', () => {

    it('runInstanceMethodCallTransaction - getGasPrice of manifest', async () => {
        const remoteNode = new RemoteNode(REMOTE_NODE_URL)
        const gasPrice = await remoteNode.getGasPrice()

        expect(Number(gasPrice)).to.be.gte(1)
    }).timeout(10000)

    it('runInstanceMethodCallTransaction - getGamete', async () => {
        const remoteNode = new RemoteNode(REMOTE_NODE_URL)
        const gamete = await remoteNode.getGamete()

        expect(gamete).to.be.not.null
        expect(gamete.transaction.hash).to.be.not.null
    }).timeout(10000)

    it('runInstanceMethodCallTransaction - getNonceOf gamete', async () => {
        const remoteNode = new RemoteNode(REMOTE_NODE_URL)
        const gamete = await remoteNode.getGamete()
        const nonceOfGamete = await remoteNode.getNonceOf(gamete)

        expect(Number(nonceOfGamete)).to.be.gt(1)
    }).timeout(10000)
})

describe('Testing the io-hotmoka-examples-1.0.1-basic.jar of a remote hotmoka node [ADD version]', () => {
   let simpleStorageReference: StorageReferenceModel

    it('addConstructorCallTransaction - it should invoke new Simple(13)', async () => {
        const remoteNode = new RemoteNode(REMOTE_NODE_URL, signer)

        const gasPrice = await remoteNode.getGasPrice()
        const nonceOfEOA = await remoteNode.getNonceOf(EOA)

        // constructor call
        const requestConstructorCall = new ConstructorCallTransactionRequestModel(
            EOA,
            nonceOfEOA,
            chainId,
            gasLimit,
            gasPrice,
            basicJarClasspath,
            new ConstructorSignatureModel(
                "io.hotmoka.examples.basic.Simple",
                [BasicType.INT.name]
            ),
            [StorageValueModel.newStorageValue("13", BasicType.INT.name)],
            remoteNode.signer
        )

        simpleStorageReference = await remoteNode.addConstructorCallTransaction(requestConstructorCall)
        expect(simpleStorageReference).to.be.not.null
        expect(simpleStorageReference.transaction).to.be.not.null
        expect(simpleStorageReference.transaction.hash).to.be.not.null
    }).timeout(10000)


    it('runInstanceMethodCallTransaction - it should invoke simple.foo3() == 13', async () => {
        const remoteNode = new RemoteNode(REMOTE_NODE_URL, signer)

        const gasPrice = await remoteNode.getGasPrice()
        const nonceOfEOA = await remoteNode.getNonceOf(EOA)

        // method call
        const requestInstanceMethodCall = new InstanceMethodCallTransactionRequestModel(
            EOA,
            nonceOfEOA,
            chainId,
            gasLimit,
            gasPrice,
            basicJarClasspath,
            new NonVoidMethodSignatureModel(
                "io.hotmoka.examples.basic.Simple",
                "foo3",
                BasicType.INT.name,
                []
            ),
            simpleStorageReference,
            [],
            remoteNode.signer
        )

        const result = await remoteNode.runInstanceMethodCallTransaction(requestInstanceMethodCall)
        expect(result).to.be.not.null
        expect(result.value).to.be.not.null
        expect(result.value).to.be.eql('13')
    }).timeout(10000)


    it('addStaticMethodCallTransaction - it should invoke Simple.foo5() == 14', async () => {
        const remoteNode = new RemoteNode(REMOTE_NODE_URL, signer)

        const gasPrice = await remoteNode.getGasPrice()
        const nonceOfEOA = await remoteNode.getNonceOf(EOA)

        // method call
        const requestInstanceMethodCall = new StaticMethodCallTransactionRequestModel(
            EOA,
            nonceOfEOA,
            chainId,
            gasLimit,
            gasPrice,
            basicJarClasspath,
            new NonVoidMethodSignatureModel(
                "io.hotmoka.examples.basic.Simple",
                "foo5",
                BasicType.INT.name,
                []
            ),
            [],
            remoteNode.signer
        )

        const result = await remoteNode.addStaticMethodCallTransaction(requestInstanceMethodCall)
        expect(result).to.be.not.null
        expect(result.value).to.be.not.null
        expect(result.value).to.be.eql('14')
    }).timeout(10000)

    it('runStaticMethodCallTransaction - it should invoke Simple.foo5() == 14', async () => {
        const remoteNode = new RemoteNode(REMOTE_NODE_URL, signer)

        const gasPrice = await remoteNode.getGasPrice()
        const nonceOfEOA = await remoteNode.getNonceOf(EOA)

        // method call
        const requestInstanceMethodCall = new StaticMethodCallTransactionRequestModel(
            EOA,
            nonceOfEOA,
            chainId,
            gasLimit,
            gasPrice,
            basicJarClasspath,
            new NonVoidMethodSignatureModel(
                "io.hotmoka.examples.basic.Simple",
                "foo5",
                BasicType.INT.name,
                []
            ),
            [],
            remoteNode.signer
        )

        const result = await remoteNode.runStaticMethodCallTransaction(requestInstanceMethodCall)
        expect(result).to.be.not.null
        expect(result.value).to.be.not.null
        expect(result.value).to.be.eql('14')
    }).timeout(10000)

})



describe('Testing the io-hotmoka-examples-1.0.0-basic.jar of a remote hotmoka node [POST version]', () => {

    it('postConstructorCallTransaction - it should invoke new Simple(13)', async () => {
        const remoteNode = new RemoteNode(REMOTE_NODE_URL, signer)

        const gasPrice = await remoteNode.getGasPrice()
        const nonceOfEOA = await remoteNode.getNonceOf(EOA)

        // constructor call
        const requestConstructorCall = new ConstructorCallTransactionRequestModel(
            EOA,
            nonceOfEOA,
            chainId,
            gasLimit,
            gasPrice,
            basicJarClasspath,
            new ConstructorSignatureModel(
                "io.hotmoka.examples.basic.Simple",
                [BasicType.INT.name]
            ),
            [StorageValueModel.newStorageValue("13", BasicType.INT.name)],
            remoteNode.signer
        )

        const promiseResult = await remoteNode.postConstructorCallTransaction(requestConstructorCall)
        const result = await remoteNode.getResponseAt(promiseResult)
        const successfulTransaction = result.transactionResponseModel as ConstructorCallTransactionSuccessfulResponseModel

        expect(successfulTransaction).to.be.not.null
        const simpleStorageReference = successfulTransaction.newObject
        expect(simpleStorageReference).to.be.not.null
        expect(simpleStorageReference.transaction).to.be.not.null
        expect(simpleStorageReference.transaction.hash).to.be.not.null
    }).timeout(10000)


    it('postStaticMethodCallTransaction - it should invoke Simple.foo5() == 14', async () => {
        const remoteNode = new RemoteNode(REMOTE_NODE_URL, signer)

        const gasPrice = await remoteNode.getGasPrice()
        const nonceOfEOA = await remoteNode.getNonceOf(EOA)

        // method call
        const requestInstanceMethodCall = new StaticMethodCallTransactionRequestModel(
            EOA,
            nonceOfEOA,
            chainId,
            gasLimit,
            gasPrice,
            basicJarClasspath,
            new NonVoidMethodSignatureModel(
                "io.hotmoka.examples.basic.Simple",
                "foo5",
                BasicType.INT.name,
                []
            ),
            [],
            remoteNode.signer
        )

        const promiseResult = await remoteNode.postStaticMethodCallTransaction(requestInstanceMethodCall)
        const result = await remoteNode.getPolledResponseAt(promiseResult)
        const successfulTransaction = result.transactionResponseModel as MethodCallTransactionSuccessfulResponseModel

        expect(successfulTransaction).to.be.not.null
        expect(successfulTransaction.result).to.be.not.null
        expect(successfulTransaction.result.value).to.be.not.null
        expect(successfulTransaction.result.value).to.be.eql('14')
    }).timeout(10000)

})

describe('Testing the Info of a remote hotmoka node', () => {

    it('it should respond with allowsUnsignedFaucet to true', async () => {
        const allowsUnsignedFaucet = await new RemoteNode(REMOTE_NODE_URL).allowsUnsignedFaucet()
        expect(allowsUnsignedFaucet).to.eql(true)
    })

    it('info - it should respond with all the info of the remote node', async () => {
        const remoteNode = new RemoteNode(REMOTE_NODE_URL)
        const info: InfoModel = await remoteNode.info()
        const gameteInfo = info.gameteInfo
        const gasStation = info.gasStation
        const validators = info.validators

        if (!gameteInfo) {
            assert.fail('missing gamete info')
        }

        if (!gasStation) {
            assert.fail('missing gasStation info')
        }

        if (!validators) {
            assert.fail('missing validators info')
        }

        if (!info.takamakaCode) {
            assert.fail('missing takamakaCode reference')
        }

        if (!info.versions) {
            assert.fail('missing versions reference')
        }

        expect(info.takamakaCode.hash).to.be.eql('56e46353158a66f893460554be026e3fc15d1a215bc59606ea5fac585527ff1a')
        expect(info.chainId).to.be.eql(chainId)
        expect(info.maxErrorLength).to.be.eql(300)
        expect(info.maxCumulativeSizeOfDependencies).to.be.eql(10000000)
        expect(info.maxDependencies).to.be.eql(20)
        expect(info.allowsSelfCharged).to.be.eql(false)
        expect(info.allowsUnsignedFaucet).to.be.eql(true)
        expect(info.skipsVerification).to.be.eql(false)
        expect(info.signature).to.be.eql('ed25519')
        expect(info.verificationVersion).to.be.eql('0')
        expect(info.versions.transaction.hash).to.be.eql('4fddb139c1d376a1e3da3c54c3cab0f98410d151d9284c092f256496b5ba1ab3')

        // gamete
        expect(gameteInfo.gamete).to.be.not.undefined
        expect(gameteInfo.balanceOfGamete).to.be.not.undefined
        expect(gameteInfo.redBalance).to.be.eql('0')
        expect(gameteInfo.maxFaucet).to.be.eql('1000000000000')
        expect(gameteInfo.maxRedFaucet).to.be.eql('0')

        // gasStation
        expect(gasStation.gasStation).to.be.not.undefined
        expect(gasStation.gasPrice).to.be.eql('1')
        expect(gasStation.maxGasPerTransaction).to.be.eql('1000000000')
        expect(gasStation.ignoresGasPrice).to.be.eql(false)
        expect(gasStation.targetGasAtReward).to.be.eql('1000000')
        expect(gasStation.inflation).to.be.eql('10000')
        expect(gasStation.oblivion).to.be.eql('250000')

        // validators
        expect(validators.validatorsReference).to.be.not.undefined
        expect(Number(validators.numOfValidators)).to.be.eql(1)
        expect(Number(validators.height)).to.be.gte(1)
        expect(Number(validators.numberOfTransactions)).to.be.gte(1)
        expect(Number(validators.ticketForNewPoll)).to.be.gte(100)
        expect(Number(validators.numberOfPolls)).to.be.gte(0)
        expect(validators.validators.length).to.be.gt(0)

        const validator = validators.validators[0]
        if (!validator.validator) {
            assert.fail('validator not defined')
        }
        expect(validator.validator).to.be.not.undefined
        expect(validator.validator.transaction.hash).to.be.eql('4fddb139c1d376a1e3da3c54c3cab0f98410d151d9284c092f256496b5ba1ab3')
        expect(validator.id).to.be.not.undefined
        expect(validator.id).to.be.eql('016C31DDFCD28FC55653279891B1A57EAB2824F2')
        expect(Number(validator.balanceOfValidator)).to.be.gt(100000)
        expect(Number(validator.power)).to.be.gte(1)

    }).timeout(40000)
})


describe('Testing creation of a hotmoka account', () => {
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

