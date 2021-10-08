import {expect} from "chai";
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
import * as fs from "fs";
import * as path from "path";
import {chainId, EOA, getPrivateKey, HOTMOKA_VERSION, REMOTE_NODE_URL} from "./RemoteNode.test";
import assert = require("assert");

const signer = new Signer(Algorithm.ED25519, getPrivateKey("./test/keys/gameteED25519.pri"))

describe('Testing the signed requests of the Hotmoka JS objects', () => {

    it('Signed string', async () => {

        const result = signer.sign(Buffer.from("hello"))
        expect(result).to.be.eq("mn+Rt4DL1EVH/kBtVm8l9y/7l5S7kJRz4XpqT6vf9ohOQFm2RSkqP8ucTh03KaOBKQclxfaOugfkeCYI9Dt7BA==")
    })

    it('new ConstructorCallTransactionRequestModel(..)', async () => {

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

        expect(request.signature).to.be.eq('P9PDt2/BL/pBVcFVwf9LvsTyb65O0SRzNC8ZeAe9Zbmn4AqTYJcFdltrWBYOFSej2I/TU3ejQyqKpPfCfp/vDA==')
    })

    it('new InstanceMethodCallTransactionRequestModel(..) NonVoidMethod', async () => {

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

        expect(request.signature).to.be.eq('vqn3qcfi3MMgJiSmLKcAtCJuX3bna3Qa+rgIku0owEhT3GaA7WwojtthtcmRKVuFj1wV+fVdgweqjNTH+FxDAg==')
    })

    it('new InstanceMethodCallTransactionRequestModel(..) VoidMethod', async () => {

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

        expect(request.signature).to.be.eq('8G7sgR0yhpRyS4dZc0sDiMRZZIkCh8m1eoFChSxWo5lL8SPtuxtoBLw4gwbN9dGLCUfqk3DpqUf5S0bwtVdMAA==')
    })


    it('new StaticMethodCallTransactionRequestModel(..) NonVoidMethod', async () => {

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

        expect(request.signature).to.be.eq('Q4oCMaptE+bLL5p5p+Uei6uINJ3TuB4/k3miqwjviKQ5ki0/oJ6hJI3xulbhaAhT5AV15P6Zy1XI2SjF9pPbDg==')
    })

    it('new StaticMethodCallTransactionRequestModel(..) VoidMethod', async () => {

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

        expect(request.signature).to.be.eq('0NwNhHIZCf3TFj5OQupJruLlRGsiR91uPhUsHTpxADgTYgIGJTULSoUAYRak1WNBUBMDG8Icx2xz3gnzhgDzBA==')
    })

    it('new StaticMethodCallTransactionRequestModel(..) NonVoidMethod gas station', async () => {

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

        expect(request.signature).to.be.eq('gNJAD15DKlQeMqqgPAKQv2jx2V7loNfkLIvJhpvUeYIxrImlyk6OmdLaAb49bHrNYY2MJoI/ujd9SBDvbK7HAA==')
    })

    it.skip('new JarStoreTransactionRequestModel(..)', async () => {

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

        expect(request.signature).to.be.eq('n5KOY/VWbm5fcUP7qYnJogfaxanj2997EJSpREKBDXOG+PC2FXllXttYl0pHtlDUJ41JzqEJ9KkKsBVTC7kZAA==')
    })

    it('it should build a valid transaction reference from a request', async () => {
        const remoteNode = new RemoteNode(REMOTE_NODE_URL, new Signer(Algorithm.ED25519, getPrivateKey("./test/keys/eoa.pri")))

        const nonceOfPayer = "1"
        const gasPrice = await remoteNode.getGasPrice()
        const takamakaCode = await remoteNode.getTakamakaCode()

        const sendAmountRequest = new InstanceMethodCallTransactionRequestModel(
            EOA,
            nonceOfPayer,
            chainId,
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
        expect(transactionReference.hash).to.eql('f0eb5cffb4b28ba7f90304506ba197536d6f4570626fe1abe9ec566c80d74e69')

    }).timeout(10000)
})


const getLocalJar = (jarName: string): Buffer => {
    return fs.readFileSync(
        path.join(
            __dirname,
            "../../../io-hotmoka-examples/target/io-hotmoka-examples-" + HOTMOKA_VERSION + "-" + jarName
        )
    )
}