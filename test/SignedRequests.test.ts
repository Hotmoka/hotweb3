import {expect} from "chai";
import assert = require("assert");
import {
    Algorithm,
    BasicType,
    ClassType,
    CodeSignature,
    ConstructorCallTransactionRequestModel,
    ConstructorSignatureModel,
    InstanceMethodCallTransactionRequestModel,
    JarStoreTransactionRequestModel,
    NonVoidMethodSignatureModel,
    RemoteNode,
    Signer,
    StaticMethodCallTransactionRequestModel,
    StorageReferenceModel,
    StorageValueModel,
    TransactionReferenceModel,
    VoidMethodSignatureModel
} from "../src"
import {CHAIN_ID, EOA, REMOTE_NODE_URL, getPrivateKey, getLocalJar} from "./constants";


const signer = new Signer(Algorithm.ED25519, getPrivateKey())

describe('Testing the signed requests of the Hotmoka JS objects', () => {

    it('Signed string', async () => {
        const result = signer.sign(Buffer.from("hello"))
        expect(result).to.be.eq("fDxLbGEt5t0of52uPvmawILvCkv/RjjfzDlZ1fNW8/5ab1aA5ZbuyeJn6ORtglMzKMmfwZEXD9El5U/dnN5dAQ==")
    })

    it('new ConstructorCallTransactionRequestModel(..) manifest', async () => {

        const constructorSignature = new ConstructorSignatureModel(
            ClassType.MANIFEST.name,
            [ClassType.BIG_INTEGER.name]
        )

        const request = new ConstructorCallTransactionRequestModel(
            new StorageReferenceModel(new TransactionReferenceModel(
                "local", "d0e496468c25fca59179885fa7c5ff4f440efbd0e0c96c2426b7997336619882"
                ), "0"
            ),
            "1",
            "chaintest",
            "11500",
            "500",
            new TransactionReferenceModel("local", "d0e496468c25fca59179885fa7c5ff4f440efbd0e0c96c2426b7997336619882"),
            constructorSignature,
            [StorageValueModel.newStorageValue("999", ClassType.BIG_INTEGER.name)],
            signer
        )

        expect(request.signature).to.be.eq('8xMW6vu9SYIFmZkGq906s7rvsclXTTJmA2mpc7QTf9Tgz7WeuJMByAX5ihBKbq5m8dmR9PD/Uv7ALmSL0iJGDg==')
    })

    it('new InstanceMethodCallTransactionRequestModel(..) getGamete', async () => {

        const request = new InstanceMethodCallTransactionRequestModel(
            new StorageReferenceModel(new TransactionReferenceModel(
                "local", "d0e496468c25fca59179885fa7c5ff4f440efbd0e0c96c2426b7997336619882"
                ), "0"
            ),
            "1",
            "chaintest",
            "5000",
            "4000",
            new TransactionReferenceModel("local", "d0e496468c25fca59179885fa7c5ff4f440efbd0e0c96c2426b7997336619882"),
            CodeSignature.GET_GAMETE,
            new StorageReferenceModel(new TransactionReferenceModel(
                "local", "d0e496468c25fca59179885fa7c5ff4f440efbd0e0c96c2426b7997336619882"
                ), "0"
            ),
            [],
            signer
        )

        expect(request.signature).to.be.eq('xHZjYO3/yKgYum/cBXFrjNFe8uzS01Sf0EDWcqGNKnkLG+LvdcqbL7BrRgX0IqWq42rlhht6nl9ZwN3sPGfaDg==')
    })

    it('new InstanceMethodCallTransactionRequestModel(..) receive', async () => {

        const RECEIVE_INT = new VoidMethodSignatureModel(
            ClassType.PAYABLE_CONTRACT.name,
            "receive",
            [BasicType.INT.name]
        )

        const request = new InstanceMethodCallTransactionRequestModel(
            new StorageReferenceModel(new TransactionReferenceModel(
                "local", "d0e496468c25fca59179885fa7c5ff4f440efbd0e0c96c2426b7997336619882"
                ), "0"
            ),
            "1",
            "chaintest",
            "5000",
            "4000",
            new TransactionReferenceModel("local", "d0e496468c25fca59179885fa7c5ff4f440efbd0e0c96c2426b7997336619882"),
            RECEIVE_INT,
            new StorageReferenceModel(new TransactionReferenceModel(
                "local", "d0e496468c25fca59179885fa7c5ff4f440efbd0e0c96c2426b7997336619882"
                ), "0"
            ),
            [StorageValueModel.newStorageValue("300", BasicType.INT.name)],
            signer
        )

        expect(request.signature).to.be.eq('FLCa/ygo2zc6gPcVt/px+uU//fK2d/4hosJhzA9B+ZxGlyXdIfV4hP1vqDTzpndKANOqGyZwfglCqv5fCr1ZBw==')
    })


    it('new StaticMethodCallTransactionRequestModel(..) nonce', async () => {

        const request = new StaticMethodCallTransactionRequestModel(
            new StorageReferenceModel(new TransactionReferenceModel(
                "local", "d0e496468c25fca59179885fa7c5ff4f440efbd0e0c96c2426b7997336619882"
                ), "0"
            ),
            "1",
            "chaintest",
            "5000",
            "4000",
            new TransactionReferenceModel("local", "d0e496468c25fca59179885fa7c5ff4f440efbd0e0c96c2426b7997336619882"),
            CodeSignature.NONCE,
            [],
            signer
        )

        expect(request.signature).to.be.eq('E6i4z6oj8/iUtHBRaLJyJ+w9erPqpy6B5Frtee2nWScfF00QOJCPGPMeXIRCUA8pw1s639dX3Mn0C0TlkYHsAQ==')
    })

    it('new StaticMethodCallTransactionRequestModel(..) receive', async () => {

        const RECEIVE_INT = new VoidMethodSignatureModel(
            ClassType.PAYABLE_CONTRACT.name,
            "receive",
            [BasicType.INT.name]
        )

        const request = new StaticMethodCallTransactionRequestModel(
            new StorageReferenceModel(new TransactionReferenceModel(
                "local", "d0e496468c25fca59179885fa7c5ff4f440efbd0e0c96c2426b7997336619882"
                ), "0"
            ),
            "1",
            "chaintest",
            "5000",
            "4000",
            new TransactionReferenceModel("local", "d0e496468c25fca59179885fa7c5ff4f440efbd0e0c96c2426b7997336619882"),
            RECEIVE_INT,
            [StorageValueModel.newStorageValue("300", BasicType.INT.name)],
            signer
        )

        expect(request.signature).to.be.eq('/klFrbZfosMu3IRHpT351OuL1lyS+WnBh+puBlR70ryziPXrA88NbC8QVt0l+UPovE/7R+5eDx/7u07fX7tHCA==')
    })

    it('new StaticMethodCallTransactionRequestModel(..) balance of gas station', async () => {

        const nonVoidMethodSignature = new NonVoidMethodSignatureModel(
            ClassType.GAS_STATION.name,
            "balance",
            ClassType.BIG_INTEGER.name,
            [ClassType.STORAGE.name]
        )

        const request = new StaticMethodCallTransactionRequestModel(
            new StorageReferenceModel(new TransactionReferenceModel(
                "local", "d0e496468c25fca59179885fa7c5ff4f440efbd0e0c96c2426b7997336619882"
                ), "0"
            ),
            "1",
            "chaintest",
            "5000",
            "4000",
            new TransactionReferenceModel("local", "d0e496468c25fca59179885fa7c5ff4f440efbd0e0c96c2426b7997336619882"),
            nonVoidMethodSignature,
            [StorageValueModel.newReference(new StorageReferenceModel(new TransactionReferenceModel(
                "local", "d0e496468c25fca59179885fa7c5ff4f440efbd0e0c96c2426b7997336619882"
                ), "0"
            ))],
            signer
        )

        expect(request.signature).to.be.eq('2ayYF3hfqesk7ihTWbrzu3l2NBDKq1O10oVxfADuvmvQKbFROT/+6aXIDXmJaql67nPPi4PtMBCe1TJatD/3Ag==')
    })

    it('new JarStoreTransactionRequestModel(..) lambdas jar', async () => {

        const request = new JarStoreTransactionRequestModel(
            new StorageReferenceModel(new TransactionReferenceModel(
                "local", "d0e496468c25fca59179885fa7c5ff4f440efbd0e0c96c2426b7997336619882"
                ), "0"
            ),
            "1",
            "chaintest",
            "5000",
            "4000",
            new TransactionReferenceModel("local", "d0e496468c25fca59179885fa7c5ff4f440efbd0e0c96c2426b7997336619882"),
            getLocalJar('lambdas.jar').toString('base64'),
            [],
            signer
        )

        expect(request.signature).to.be.eq('nABhCadnAMRkb2Ceh7fwmBl5WbpTJvEALSXUKEEz43bHrvrHY8oheSus3gOHnc0S2aUCxl2eCbG3cgAD1szsDA==')
    })

    it('it should build a valid transaction reference from a request', async () => {
        const remoteNode = new RemoteNode(REMOTE_NODE_URL, signer)

        const nonceOfPayer = "1"
        const gasPrice = await remoteNode.getGasPrice()
        const takamakaCode = await remoteNode.getTakamakaCode()

        const sendAmountRequest = new InstanceMethodCallTransactionRequestModel(
            EOA,
            nonceOfPayer,
            CHAIN_ID,
            "100000",
            gasPrice,
            takamakaCode,
            CodeSignature.RECEIVE_BIG_INTEGER,
            StorageReferenceModel.newStorageReference('9c35d9584b03ecdbbe6be33953ccd1ccdcd3f73955dde1c6a1e46a3a1da1fbd1'),
            [StorageValueModel.newStorageValue("100", ClassType.BIG_INTEGER.name)],
            remoteNode.signer
        )

        const transactionReference = sendAmountRequest.getReference(sendAmountRequest.signature)
        if (!transactionReference) {
            assert.fail('transactionReference cannot be null')
        }
        expect(transactionReference.hash).to.eql('14f96faef92e8533ae9107d83b7b126da488dbfff1770b0dddc2231a10b10a8e')

    }).timeout(10000)
})
