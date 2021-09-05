import {RemoteNode} from "../RemoteNode";
import {Algorithm} from "../signature/Algorithm";
import {ClassType} from "../lang/ClassType";
import {HotmokaException} from "../exceptions/HotmokaException";
import {InstanceMethodCallTransactionRequestModel} from "../models/requests/InstanceMethodCallTransactionRequestModel";
import {NonVoidMethodSignatureModel} from "../models/signatures/NonVoidMethodSignatureModel";
import {StorageValueModel} from "../models/values/StorageValueModel";
import {Bip39} from "../bip39/Bip39";
import {KeyPair} from "../bip39/KeyPair";
import {KeyPairGenerator} from "../bip39/KeyPairGenerator";
import {Bip39Dictionary} from "../bip39/Bip39Dictionary";
import {Account} from "../models/Account";
import {StorageReferenceModel} from "../models/values/StorageReferenceModel";
import {CodeSignature} from "../lang/CodeSignature";
import {Base58} from "../bip39/Base58";
import {Signer} from "../signature/Signer";
import {TransactionReferenceModel} from "../models/values/TransactionReferenceModel";
import {ConstructorCallTransactionRequestModel} from "../models/requests/ConstructorCallTransactionRequestModel";
import {ConstructorSignatureModel} from "../models/signatures/ConstructorSignatureModel";

export class AccountHelper {
    private static readonly EXTRA_GAS_FOR_ANONYMOUS = 500000
    private static readonly _100_000 = 100000
    private readonly remoteNode: RemoteNode


    /**
     * Builds an object that helps with the creation of new accounts.
     * @param remoteNode the remote node
     */
    constructor(remoteNode: RemoteNode) {
        this.remoteNode = remoteNode
    }

    /**
     * Creates a new account by letting another account pay.
     * @param algorithm the signature algorithm for the new account
     * @param payer the storage reference of the payer
     * @param keyPairOfPayer the key pair of the payer
     * @param keyPair the key pair of the new account
     * @param balance the balance of the new account
     * @param balanceRed the red balance of the new account
     * @param addToLedger adds the new account to the ledger of the manifest, bound to its {@code publicKey}; if an account already
     *                    exists for {@code publicKey}, that account gets funded with {@code balance} and {@code balanceRed} coins and returned
     * @return the account
     * @throws TransactionRejectedException if the transaction could not be executed
     * @throws CodeExecutionException if the transaction could be executed but led to an exception in the user code in blockchain,
     *                                that is allowed to be thrown by the method
     * @throws TransactionException if the transaction could be executed but led to an exception outside the user code in blockchain,
     *                              or that is not allowed to be thrown by the method
     */
    public async createAccountFromPayer(algorithm: Algorithm, payer: StorageReferenceModel, keyPairOfPayer: KeyPair, keyPair: KeyPair, balance: string, balanceRed: string, addToLedger: boolean): Promise<Account> {
        if (algorithm === Algorithm.SHA256DSA) {
            throw new HotmokaException("Algorithm not implemented")
        }

        if (addToLedger && algorithm !== Algorithm.ED25519) {
            throw new HotmokaException("can only store ed25519 accounts into the ledger of the manifest")
        }

        const chainId = await this.remoteNode.getChainId()
        const takamakaCode = await this.remoteNode.getTakamakaCode()
        const nonceOfPayer = await this.remoteNode.getNonceOf(payer)
        const signatureAlgorithmOfPayer = await this.getSignatureAlgorithm(payer)
        const signatureOfPayer = new Signer(signatureAlgorithmOfPayer, keyPairOfPayer.privateKey)
        const gas1 = AccountHelper._100_000
        const gas2 = AccountHelper._100_000
        const gasPrice = await this.remoteNode.getGasPrice()

        let account: StorageReferenceModel | undefined;
        if (addToLedger) {
            const accountsLedger = await this.getAccountsLedger(takamakaCode)
            const gas = gas1 + gas2 + AccountHelper.EXTRA_GAS_FOR_ANONYMOUS
            const accountResult = await this.remoteNode.addInstanceMethodCallTransaction(new InstanceMethodCallTransactionRequestModel(
                payer,
                nonceOfPayer,
                chainId,
                gas.toString(),
                gasPrice,
                takamakaCode,
                new NonVoidMethodSignatureModel(ClassType.ACCOUNTS_LEDGER.name, "add", ClassType.EOA_ED25519.name, [ClassType.BIG_INTEGER.name, ClassType.STRING.name]),
                accountsLedger,
                [
                    StorageValueModel.newStorageValue(balance, ClassType.BIG_INTEGER.name),
                    StorageValueModel.newStorageValue(keyPair.publicKey, ClassType.STRING.name)
                ],
                signatureOfPayer
            ))
            account = accountResult.reference

        } else {
            const gas = gas1 + gas2
            account = await this.remoteNode.addConstructorCallTransaction(new ConstructorCallTransactionRequestModel(
                payer,
                nonceOfPayer,
                chainId,
                gas.toString(),
                gasPrice,
                takamakaCode,
                new ConstructorSignatureModel(ClassType.EOA_ED25519.name,[ClassType.BIG_INTEGER.name, ClassType.STRING.name]),
                [
                    StorageValueModel.newStorageValue(balance, ClassType.BIG_INTEGER.name),
                    StorageValueModel.newStorageValue(keyPair.publicKey, ClassType.STRING.name)
                ],
                signatureOfPayer
            ))
        }

        return Promise.resolve(new Account(keyPair.entropy, keyPair.publicKey, Base58.encode(keyPair.publicKey), balance, account))
    }


    /**
     * Creates a new account by letting the faucet pay.
     * @param algorithm the signature algorithm for the new account
     * @param keyPair the key pair of the new account
     * @param balance the balance of the new account
     * @param balanceRed the red balance of the new account
     * @return the account
     * @throws TransactionRejectedException if the transaction could not be executed
     * @throws CodeExecutionException if the transaction could be executed but led to an exception in the user code in blockchain,
     *                                that is allowed to be thrown by the method
     * @throws TransactionException if the transaction could be executed but led to an exception outside the user code in blockchain,
     *                              or that is not allowed to be thrown by the method
     */
    public async createAccountFromFaucet(algorithm: Algorithm, keyPair: KeyPair, balance: string, balanceRed: string): Promise<Account> {
        if (algorithm === Algorithm.SHA256DSA) {
            throw new HotmokaException("Algorithm not implemented")
        }

        const takamakaCode = await this.remoteNode.getTakamakaCode()
        const gamete = await this.remoteNode.getGamete()
        const nonceOfGamete = await this.remoteNode.getNonceOf(gamete)
        const methodName = "faucet" + Algorithm[algorithm]
        const eoaType = new ClassType(ClassType.EOA.name + Algorithm[algorithm])
        const gas = AccountHelper._100_000.toString()
        const gasPrice = await this.remoteNode.getGasPrice()
        const chainId = await this.remoteNode.getChainId()

        const account = await this.remoteNode.addInstanceMethodCallTransaction(new InstanceMethodCallTransactionRequestModel(
            gamete,
            nonceOfGamete,
            chainId,
            gas,
            gasPrice,
            takamakaCode,
            new NonVoidMethodSignatureModel(ClassType.GAMETE.name, methodName, eoaType.name, [ClassType.BIG_INTEGER.name, ClassType.BIG_INTEGER.name, ClassType.STRING.name]),
            gamete,
            [
                StorageValueModel.newStorageValue(balance, ClassType.BIG_INTEGER.name),
                StorageValueModel.newStorageValue(balanceRed, ClassType.BIG_INTEGER.name),
                StorageValueModel.newStorageValue(keyPair.publicKey, ClassType.STRING.name)
            ]
        ))

        return Promise.resolve(new Account(keyPair.entropy, keyPair.publicKey, Base58.encode(keyPair.publicKey), balance, account.reference))
    }

    /**
     * It creates a local account without the reference in the store of the remote node.
     * @param keyPair the key pair generated
     * @return a local account
     */
    public createLocalAccount(keyPair: KeyPair): Account {
        return new Account(keyPair.entropy, keyPair.publicKey, Base58.encode(keyPair.publicKey), '0')
    }

    /**
     * It imports a Hotmoka account.
     * @param name the name of the account
     * @param mnemonic the mnemonic
     * @param password the password
     */
    public async importAccount(name: string, mnemonic: string, password: string): Promise<Account> {
        const account = new Bip39({dictionary: Bip39Dictionary.ENGLISH, mnemonic: mnemonic}).getAccount()
        if (!account.reference) {
            throw new HotmokaException('Unable to reconstruct the storage reference of the account')
        }
        const keyPair = AccountHelper.generateEd25519KeyPairFrom(password, Bip39Dictionary.ENGLISH, account.entropy)
        const accountIsVerified = await this.verifyAccount(account.reference, keyPair.publicKey)
        if (!accountIsVerified) {
            throw new HotmokaException('The public key of the account does not match its entropy')
        }

        const balance = await this.getBalance(account.reference)
        return Promise.resolve(new Account(account.entropy, keyPair.publicKey, name, balance, account.reference))
    }

    /**
     * Checks that the given account address is actually an account object in the remote node
     * with the same public key as the account.
     * @param accountAddress the address of the account
     * @param publicKeyToCheck the public key to check encoded in base64
     * @return true if the provided public key is equal to the public key stored in the remote node,
     *              false otherwise
     */
    public async verifyAccount(accountAddress: StorageReferenceModel, publicKeyToCheck: string): Promise<boolean> {
        const publicKey = await this.getPublicKey(accountAddress)
        return Promise.resolve(publicKey === publicKeyToCheck)
    }


    /**
     * Creates a {@link KeyPair} from the given password, BIP39 dictionary and entropy.
     * @param password the password
     * @param bip39Dictionary the bip39 dictionary to use. Available options: "english"
     * @param entropy the optional entropy encoded in HEX. It will use a random 16 bytes entropy if not provided.
     * @return a {@link KeyPair}
     */
    public static generateEd25519KeyPairFrom(password: string, bip39Dictionary: Bip39Dictionary, entropy?: string): KeyPair {
        return KeyPairGenerator.generateEd25519KeyPair(password, bip39Dictionary, entropy ? Buffer.from(entropy, 'hex') : undefined)
    }

    /**
     * Yields the account reconstructed from these BIP39 mnemonic words.
     * This works only if the words were actually derived from an account.
     * @param mnemonic the BIP39 mnemonic words
     * @param bip39Dictionary the bi39 dictionary used
     * @return the account
     */
    public static generateAccountFrom(mnemonic: string, bip39Dictionary: Bip39Dictionary): Account {
        return new Bip39({dictionary: bip39Dictionary, mnemonic: mnemonic}).getAccount()
    }

    /**
     * Yields the 36 mnemonic words reconstructed from the given entropy and storage reference of an account.
     * @param entropy the entropy encoded in HEX
     * @param storageReferenceHash the hash of the storage reference of the account
     * @param bip39Dictionary the bi39 dictionary used
     * @return an array with the 36 mnemonic words
     */
    public static generateMnemonicWordsFrom(entropy: string, storageReferenceHash: string, bip39Dictionary: Bip39Dictionary): Array<string> {
        const mnemonic = new Bip39({dictionary: bip39Dictionary, entropy: entropy, hashOfTransactionReference: storageReferenceHash}).getMnemonic()
        return mnemonic.split(" ")
    }

    /**
     * It returns the public key from the remote node of the given account reference.
     * @param reference the reference of the account
     * @return the public key
     */
    private async getPublicKey(reference: StorageReferenceModel): Promise<string> {
        const takamakaCode = await this.remoteNode.getTakamakaCode()
        const result = await this.remoteNode.runInstanceMethodCallTransaction(new InstanceMethodCallTransactionRequestModel(
            reference,
            "0",
            "",
            AccountHelper._100_000.toString(),
            "0",
            takamakaCode,
            CodeSignature.PUBLIC_KEY,
            reference,
            []
            )
        )

        if (result && result.value) {
            return result.value
        } else {
            throw new HotmokaException("Unable to get the public key of " + reference.transaction.hash)
        }
    }

    /**
     * It returns the balance of the given account reference from the remote node.
     * @param reference the reference of the account
     * @return the balance
     */
    private async getBalance(reference: StorageReferenceModel): Promise<string> {
        const takamakaCode = await this.remoteNode.getTakamakaCode()
        const result = await this.remoteNode.runInstanceMethodCallTransaction(new InstanceMethodCallTransactionRequestModel(
            reference,
            "0",
            "",
            AccountHelper._100_000.toString(),
            "0",
            takamakaCode,
            CodeSignature.BALANCE,
            reference,
            []
            )
        )

        if (result && result.value) {
            return result.value
        } else {
            throw new HotmokaException("Unable to get the balance of " + reference.transaction.hash)
        }
    }

    /**
     * It returns the signature algorithm of the payer.
     * @param reference the reference of the account of the payer
     * @return the signature algorithm
     * @throws HotmokaException if the signature algorithm of the payer is unmanaged
     */
    private async getSignatureAlgorithm(reference: StorageReferenceModel): Promise<Algorithm> {
        const classTag = await this.remoteNode.getClassTag(reference)

        if (classTag && classTag.className === ClassType.EOA_ED25519.name) {
            return Algorithm.ED25519
        } else {
            throw new HotmokaException("Unmanaged payer signature algorithm")
        }
    }

    /**
     * It returns the accounts ledger of the manifest.
     * @param takamakaCode the reference of takamakaCode
     * @return the reference of the accounts ledger
     */
    private async getAccountsLedger(takamakaCode: TransactionReferenceModel): Promise<StorageReferenceModel> {
        const manifest = await this.remoteNode.getManifest()
        const accountsLedger = await this.remoteNode.runInstanceMethodCallTransaction(new InstanceMethodCallTransactionRequestModel(
                manifest,
                "0",
                "",
                AccountHelper._100_000.toString(),
                "0",
                takamakaCode,
                CodeSignature.GET_ACCOUNTS_LEDGER,
                manifest,
                []
            )
        )

        if (accountsLedger && accountsLedger.reference) {
            return accountsLedger.reference
        } else {
            throw new HotmokaException("Unable to retrieve the accounts ledger")
        }
    }
 }