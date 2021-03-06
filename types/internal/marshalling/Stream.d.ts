/// <reference types="node" />
/**
 * A stream used to generate the bytes of the JS objects.
 * Porting of the ObjectOutputStream class of Java.
 */
export declare class Stream {
    /**
     * Java ObjectOutputStream header signature.
     */
    readonly STREAM_MAGIC = 44269;
    readonly STREAM_VERSION = 5;
    /**
     * Maximum data block length.
     */
    private readonly MAX_BLOCK_SIZE;
    /**
     * Length of char buffer to write strings.
     */
    private readonly CHAR_BUF_SIZE;
    /**
     * Block of optional data. Byte following tag indicates number of bytes in this block data.
     */
    private readonly TC_BLOCKDATA;
    /**
     * Long Block data. The long following the tag indicates the number of bytes in this block data.
     */
    private readonly TC_BLOCKDATALONG;
    /**
     * The general/block buffer to write to.
     */
    private buffer;
    /**
     * The offset of the general/block buffer.
     */
    private offset;
    /**
     * The header buffer.
     */
    private headerBuffer;
    /**
     * The char buffer to write strings.
     */
    private charBuffer;
    /**
     * The final buffer which wraps the header and the general/block buffer.
     */
    private bufferedStream;
    constructor();
    /**
     * Writes all buffered data to the bufferedStream stream.
     */
    private drain;
    /**
     * Writes block data header. Data blocks shorter than 256 bytes
     * are prefixed with a 2-byte header; all others start with a 5-byte header.
     */
    private writeBlockHeader;
    /**
     * It writes the magic number and version to the stream.
     */
    private writeStreamHeader;
    /**
     * It writes a string to the buffer.
     * @param s the string
     */
    private writeStringInternal;
    /**
     * It writes a string to a char buffer.
     * @param str the string
     * @param srcBegin the start position from where to copy the chars from str
     * @param srcEnd the end position where to stop copying the chars from str
     */
    private toCharBuffer;
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
     * Writes a buffer.
     * @param buff the buffer
     */
    writeBuffer(buff: Buffer): void;
    /**
     * Writes an 8 bit byte to a buffer.
     * @param buffer the buffer
     * @param val the value
     * @param offset the offset
     */
    private static writeByte;
    static toShort(val: number): number;
    static toByte(val: number): number;
    static toInt(val: number): number;
    static toBigint(val: number): bigint;
}
