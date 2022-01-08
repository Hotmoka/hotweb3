import {assert, expect} from 'chai';
import {
    Algorithm,
    BasicType,
    ConstructorCallTransactionRequestModel,
    ConstructorCallTransactionSuccessfulResponseModel,
    ConstructorSignatureModel,
    InfoModel,
    InstanceMethodCallTransactionRequestModel,
    JarStoreInitialTransactionResponseModel,
    JarStoreTransactionRequestModel,
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
import {TransactionRestRequestModel} from "../src/internal/models/requests/TransactionRestRequestModel";
import {CHAIN_ID, EOA, REMOTE_NODE_URL, getPrivateKey, HOTMOKA_VERSION} from "./constants";
import {NodeInfo} from "../src/internal/models/info/NodeInfo";

const SIGNER = new Signer(Algorithm.ED25519, getPrivateKey())
const BASIC_JAR_REFERENCE = new TransactionReferenceModel("local", "f04e9dd9d74b0f0ca17a4fbc1d143149ca6cf4d89afa60c72d47a9d1f5fb2083")
const GAS_LIMIT = "500000"

console.log('Testing Hotmoka version ' + HOTMOKA_VERSION)

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

    it('getNodeID - it should respond with a valid node info', async () => {
        const remoteNode = new RemoteNode(REMOTE_NODE_URL)
        const result: NodeInfo = await remoteNode.getNodeID()

        expect(result.type).to.be.eql('io.hotmoka.tendermint.TendermintBlockchain')
        expect(result.version).to.be.eql('1.0.7')
        expect(result.ID).to.be.eql('5ca9732ac7efff4f03ef012e7ce9407b01f73e0c')
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
        expect(result.algorithm).to.be.eql(Algorithm[SIGNER.algorithm].toLocaleLowerCase())
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

describe('Testing the io-hotmoka-examples-X-basic.jar installed on a remote hotmoka node [ADD version]', () => {
   let simpleStorageReference: StorageReferenceModel

    it('addConstructorCallTransaction - it should invoke new Simple(13)', async () => {
        const remoteNode = new RemoteNode(REMOTE_NODE_URL, SIGNER)

        const gasPrice = await remoteNode.getGasPrice()
        const nonceOfEOA = await remoteNode.getNonceOf(EOA)

        // constructor call
        const requestConstructorCall = new ConstructorCallTransactionRequestModel(
            EOA,
            nonceOfEOA,
            CHAIN_ID,
            GAS_LIMIT,
            gasPrice,
            BASIC_JAR_REFERENCE,
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
        const remoteNode = new RemoteNode(REMOTE_NODE_URL, SIGNER)

        const gasPrice = await remoteNode.getGasPrice()
        const nonceOfEOA = await remoteNode.getNonceOf(EOA)

        // method call
        const requestInstanceMethodCall = new InstanceMethodCallTransactionRequestModel(
            EOA,
            nonceOfEOA,
            CHAIN_ID,
            GAS_LIMIT,
            gasPrice,
            BASIC_JAR_REFERENCE,
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
        const remoteNode = new RemoteNode(REMOTE_NODE_URL, SIGNER)

        const gasPrice = await remoteNode.getGasPrice()
        const nonceOfEOA = await remoteNode.getNonceOf(EOA)

        // method call
        const requestInstanceMethodCall = new StaticMethodCallTransactionRequestModel(
            EOA,
            nonceOfEOA,
            CHAIN_ID,
            GAS_LIMIT,
            gasPrice,
            BASIC_JAR_REFERENCE,
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
        const remoteNode = new RemoteNode(REMOTE_NODE_URL, SIGNER)

        const gasPrice = await remoteNode.getGasPrice()
        const nonceOfEOA = await remoteNode.getNonceOf(EOA)

        // method call
        const requestInstanceMethodCall = new StaticMethodCallTransactionRequestModel(
            EOA,
            nonceOfEOA,
            CHAIN_ID,
            GAS_LIMIT,
            gasPrice,
            BASIC_JAR_REFERENCE,
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

describe('Testing the io-hotmoka-examples-X-basic.jar installed on a remote hotmoka node [POST version]', () => {

    it('postConstructorCallTransaction - it should invoke new Simple(13)', async () => {
        const remoteNode = new RemoteNode(REMOTE_NODE_URL, SIGNER)
        const gasPrice = await remoteNode.getGasPrice()
        const nonceOfEOA = await remoteNode.getNonceOf(EOA)

        // constructor call
        const requestConstructorCall = new ConstructorCallTransactionRequestModel(
            EOA,
            nonceOfEOA,
            CHAIN_ID,
            GAS_LIMIT,
            gasPrice,
            BASIC_JAR_REFERENCE,
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
        const remoteNode = new RemoteNode(REMOTE_NODE_URL, SIGNER)
        const gasPrice = await remoteNode.getGasPrice()
        const nonceOfEOA = await remoteNode.getNonceOf(EOA)

        // method call
        const requestInstanceMethodCall = new StaticMethodCallTransactionRequestModel(
            EOA,
            nonceOfEOA,
            CHAIN_ID,
            GAS_LIMIT,
            gasPrice,
            BASIC_JAR_REFERENCE,
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

        if (!gameteInfo || !gameteInfo.gamete) {
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

        if (!info.accountsLedger) {
            assert.fail('missing accountsLedger reference')
        }

        expect(info.takamakaCode.hash).to.be.eql('5878d6d66699ffe19f95482c3080356008f917263c68a8a872be3c437020c9eb')
        expect(info.chainId).to.be.eql(CHAIN_ID)
        expect(info.maxErrorLength).to.be.eql(300)
        expect(info.maxCumulativeSizeOfDependencies).to.be.eql(10000000)
        expect(info.maxDependencies).to.be.eql(20)
        expect(info.allowsSelfCharged).to.be.eql(false)
        expect(info.allowsUnsignedFaucet).to.be.eql(true)
        expect(info.allowsMintBurnFromGamete).to.be.eql(false)
        expect(info.skipsVerification).to.be.eql(false)
        expect(info.signature).to.be.eql('ed25519')
        expect(info.verificationVersion).to.be.eql('0')
        expect(info.versions.transaction.hash).to.be.eql('4cb4ebfcff972f60c22f1bf16950ca11fca32a2d1622b67d2b7f3e63166f37c3')
        expect(info.accountsLedger.transaction.hash).to.be.eql('4cb4ebfcff972f60c22f1bf16950ca11fca32a2d1622b67d2b7f3e63166f37c3')

        // gamete
        expect(gameteInfo.gamete).to.be.not.undefined
        expect(gameteInfo.gamete.transaction).to.be.not.undefined
        expect(gameteInfo.gamete.transaction.hash).to.be.eql('ce08d392e97600279f8571dd4971e1a1b7422015655001c7cb4abb0159266a86')
        expect(gameteInfo.balanceOfGamete).to.be.not.undefined
        expect(Number(gameteInfo.balanceOfGamete!)).to.be.greaterThan(1000)
        expect(gameteInfo.redBalance).to.be.eql('0')
        expect(gameteInfo.maxFaucet).to.be.eql('10000000000000')
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
        expect(validator.validator.transaction.hash).to.be.eql('4cb4ebfcff972f60c22f1bf16950ca11fca32a2d1622b67d2b7f3e63166f37c3')
        expect(validator.id).to.be.not.undefined
        expect(validator.id).to.be.eql('3367D160E5190B4ED636A2973F39A71BA3F7726F')
        expect(Number(validator.balanceOfValidator)).to.be.gt(100000)
        expect(Number(validator.power)).to.be.gte(1)

    }).timeout(40000)
})

