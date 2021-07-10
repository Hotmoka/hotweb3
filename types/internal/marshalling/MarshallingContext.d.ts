/// <reference types="node" />
import { FieldSignatureModel } from "../../models/signatures/FieldSignatureModel";
import { StorageReferenceModel } from "../../models/values/StorageReferenceModel";
import { TransactionReferenceModel } from "../../models/values/TransactionReferenceModel";
/**
 * A context used during object marshalling into bytes.
 */
export declare class MarshallingContext {
    private readonly stream;
    private readonly memoryString;
    private readonly memoryFieldSignature;
    private readonly memoryStorageReference;
    private readonly memoryTransactionReference;
    /**
     * It returns the buffer.
     * @return the buffer
     */
    getBuffer(): Buffer;
    /**
     * It returns the base64 string representation of the buffer.
     * @return the base64 string representation of the buffer
     */
    toBase64(): string;
    /**
     * Flushes the stream. This will write any buffered output bytes and flush through to the underlying stream.
     */
    flush(): void;
    /**
     * Writes a string.
     * @param str the string
     */
    writeString(str: string): void;
    /**
     * Writes 16 bit char.
     * @param val the value
     */
    writeChar(val: string): void;
    /**
     * Writes a boolean.
     * @param val the value
     */
    writeBoolean(val: boolean): void;
    /**
     * Writes a 16 bit short.
     * @param val the value
     */
    writeShort(val: number): void;
    /**
     * Writes a 32 bit int.
     * @param val the value
     */
    writeInt(val: number): void;
    /**
     * Writes a 32 bit float.
     * @param val the value
     */
    writeFloat(val: number): void;
    /**
     * Writes a 64 bit double.
     * @param val the value
     */
    writeDouble(val: number): void;
    /**
     * Writes a 64 bit long.
     * @param val the value
     */
    writeLong(val: number): void;
    /**
     * Writes an 8 bit byte.
     * @param val the value
     */
    writeByte(val: number): void;
    /**
     * Writes the given integer, in a way that compacts small integers.
     * @param val the integer
     */
    writeCompactInt(val: number): void;
    /**
     * Writes the given big integer, in a compact way.
     * @param biValue the big integer
     */
    writeBigInteger(biValue: string): void;
    /**
     * Writes a buffer.
     * @param buff the buffer
     */
    writeBuffer(buff: Buffer): void;
    /**
     * Writes the given string into the output stream. It uses a memory
     * to avoid repeated writing of the same string: the second write
     * will refer to the first one.
     * @param str the string to write
     */
    writeStringShared(str: string): void;
    /**
     * Writes the given field signature into the output stream. It uses
     * a memory to recycle field signatures already written with this context
     * and compress them by using their progressive number instead.
     * @param fieldSignature the field signature to write
     */
    writeFieldSignature(fieldSignature: FieldSignatureModel): void;
    /**
     * Writes the given storage reference into the output stream. It uses
     * a memory to recycle storage references already written with this context
     * and compress them by using their progressive number instead.
     * @param storageReference the storage reference to write
     */
    writeStorageReference(storageReference: StorageReferenceModel): void;
    /**
     * Writes the given transaction reference into the output stream. It uses
     * a memory to recycle transaction references already written with this context
     * and compress them by using their progressive number instead.
     *
     * @param transactionReference the transaction reference to write
     */
    writeTransactionReference(transactionReference: TransactionReferenceModel): void;
    private static fieldSignatureToBase64Key;
    private static storageReferenceToBase64Key;
}
