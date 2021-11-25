import {Buffer} from "buffer";
import {HotmokaException} from "../exceptions/HotmokaException";
import {BufferedStream} from "./BufferedStream";

/**
 * A stream used to generate the bytes of the JS objects.
 * Porting of the ObjectOutputStream class of Java.
 */
export class Stream {
    /**
     * Java ObjectOutputStream header signature.
     */
    public readonly STREAM_MAGIC = 44269
    public readonly STREAM_VERSION = 5

    /**
     * Maximum data block length.
     */
    private readonly MAX_BLOCK_SIZE = 1024

    /**
     * Length of char buffer to write strings.
     */
    private readonly CHAR_BUF_SIZE = 256

    /**
     * Block of optional data. Byte following tag indicates number of bytes in this block data.
     */
    private readonly TC_BLOCKDATA = 119
    /**
     * Long Block data. The long following the tag indicates the number of bytes in this block data.
     */
    private readonly TC_BLOCKDATALONG = 122

    /**
     * The general/block buffer to write to.
     */
    private buffer = Buffer.alloc(this.MAX_BLOCK_SIZE)

    /**
     * The offset of the general/block buffer.
     */
    private offset = 0

    /**
     * The header buffer.
     */
    private headerBuffer = Buffer.alloc(5)

    /**
     * The char buffer to write strings.
     */
    private charBuffer = Buffer.alloc(this.CHAR_BUF_SIZE)

    /**
     * The final buffer which wraps the header and the general/block buffer.
     */
    private bufferedStream = new BufferedStream()

    constructor() {
        this.writeStreamHeader()
    }


    private drain() {
        if (this.offset === 0) {
            return
        }

        this.writeBlockHeader(this.offset)
        this.bufferedStream.write(this.buffer, 0, this.offset)
        this.offset = 0
    }


    /**
     * Writes block data header. Data blocks shorter than 256 bytes
     * are prefixed with a 2-byte header; all others start with a 5-byte header.
     */
    private writeBlockHeader(len: number): void {
        if (len <= 255) {
            Stream.writeByte(this.headerBuffer, this.TC_BLOCKDATA, 0)
            Stream.writeByte(this.headerBuffer, len, 1)
            this.bufferedStream.write(this.headerBuffer, 0, 2)
        } else {
            Stream.writeByte(this.headerBuffer, this.TC_BLOCKDATALONG, 0)
            Stream.writeByte(this.headerBuffer, len >>> 24, 1)
            Stream.writeByte(this.headerBuffer, len >>> 16, 2)
            Stream.writeByte(this.headerBuffer, len >>> 8, 3)
            Stream.writeByte(this.headerBuffer, len, 4)
            this.bufferedStream.write(this.headerBuffer, 0, 5)
        }
    }

    /**
     * It writes the magic number and version to the stream.
     */
    private writeStreamHeader(): void {
        this.writeShort(this.STREAM_MAGIC)
        this.writeShort(this.STREAM_VERSION)

        this.bufferedStream.write(this.buffer, 0, this.offset)
        this.offset = 0
    }

    private writeStringInternal(s: string): void {
        const endoff = s.length
        let cpos = 0
        let csize = 0
        for (let off = 0; off < endoff; ) {
            if (cpos >= csize) {
                cpos = 0
                csize = Math.min(endoff - off, this.CHAR_BUF_SIZE)
                this.toCharBuffer(s, off, off + csize)
            }
            if (this.offset >= this.MAX_BLOCK_SIZE) {
                this.drain()
            }
            let n = Math.min(csize - cpos, this.MAX_BLOCK_SIZE - this.offset)
            let stop = this.offset + n
            while (this.offset < stop) {
                this.writeByte(this.charBuffer[cpos++])
            }
            off += n
        }
    }

    private toCharBuffer(str: string, srcBegin: number, srcEnd: number): void {
        let dstBegin = 0
        const chars = Array.from(str)

        for (let i = srcBegin; i < srcEnd; i++) {
            this.charBuffer[dstBegin++] = chars[i].charCodeAt(0)
        }
    }

    /**
     * It returns the buffer.
     * @return the buffer
     */
    public getBuffer(): Buffer {
        return this.bufferedStream.getBuffer()
    }

    /**
     * It returns the base64 string representation of the buffer.
     * @return the base64 string representation of the buffer
     */
    public toBase64(): string {
        return this.getBuffer().toString('base64')
    }

    /**
     * Flushes the stream. This will write any buffered output bytes and flush through to the underlying stream.
     */
    public flush(): void {
        this.drain()
    }

    /**
     * Writes a string.
     * @param str the string
     */
    public writeString(str: string): void {
        if (str === null || str === undefined) {
            throw new HotmokaException("Cannot marshall a null string")
        }

        this.writeShort(str.length)
        this.writeStringInternal(str)
    }

    /**
     * Writes 16 bit char.
     * @param val the value
     */
    public writeChar(val: string): void {
        if (val && val.length > 1) {
            throw new HotmokaException("Value should have length 1")
        }

        if (this.offset + 2 <= this.MAX_BLOCK_SIZE) {
            this.writeByte(val.charCodeAt(0) >>> 8)
            this.writeByte(val.charCodeAt(0))
        } else {
            this.bufferedStream.writeByte(Stream.toByte(val.charCodeAt(0) >>> 8))
            this.bufferedStream.writeByte(Stream.toByte(val.charCodeAt(0)))
        }
    }

    /**
     * Writes a boolean.
     * @param val the value
     */
    public writeBoolean(val: boolean): void {
        if (this.offset >= this.MAX_BLOCK_SIZE) {
            this.drain()
        }
        this.writeByte(val ? 1 : 0)
    }

    /**
     * Writes a 16 bit short.
     * @param val the value
     */
    public writeShort(val: number): void {
        if (this.offset + 2 <= this.MAX_BLOCK_SIZE) {
            this.writeByte(val >>> 8)
            this.writeByte(val)
        }  else {
            this.bufferedStream.writeShort(val)
        }
    }

    /**
     * Writes a 32 bit int.
     * @param val the value
     */
    public writeInt(val: number): void {
        if (this.offset + 4 <= this.MAX_BLOCK_SIZE) {
            this.buffer.writeInt32BE(val, this.offset)
            this.offset += 4
        } else {
           this.bufferedStream.writeInt(val)
        }
    }

    /**
     * Writes a 32 bit float.
     * @param val the value
     */
    public writeFloat(val: number): void {
        if (this.offset + 4 <= this.MAX_BLOCK_SIZE) {
            this.buffer.writeFloatBE(val, this.offset)
            this.offset += 4
        } else {
           this.bufferedStream.writeFloat(val)
        }
    }

    /**
     * Writes a 64 bit double.
     * @param val the value
     */
    public writeDouble(val: number): void {
        if (this.offset + 8 <= this.MAX_BLOCK_SIZE) {
            this.buffer.writeDoubleBE(val, this.offset)
            this.offset += 8
        } else {
            this.bufferedStream.writeDouble(val)
        }
    }

    /**
     * Writes a 64 bit long.
     * @param val the value
     */
    public writeLong(val: number): void {
        if (this.offset + 8 <= this.MAX_BLOCK_SIZE) {
            this.buffer.writeBigInt64BE(BigInt(val), this.offset)
            this.offset += 8
        } else {
           this.bufferedStream.writeLong(val)
        }
    }

    /**
     * Writes an 8 bit byte.
     * @param val the value
     */
    public writeByte(val: number): void {
        this.buffer.writeInt8(Stream.toByte(val), this.offset++)
    }

    /**
     * Writes a buffer.
     * @param buff the buffer
     */
    public writeBuffer(buff: Buffer): void {
        let off = 0
        let len = buff.length

        while (len > 0) {
            if (this.offset >= this.MAX_BLOCK_SIZE) {
                this.drain()
            }

            if (len >= this.MAX_BLOCK_SIZE && this.offset == 0) {
                // avoid unnecessary copy
                this.writeBlockHeader(this.MAX_BLOCK_SIZE)
                this.bufferedStream.write(buff, off, this.MAX_BLOCK_SIZE)
                off += this.MAX_BLOCK_SIZE
                len -= this.MAX_BLOCK_SIZE
            } else {
                const wlen = Math.min(len, this.MAX_BLOCK_SIZE - this.offset)
                buff.copy(this.buffer, this.offset, off, off + wlen)
                this.offset += wlen
                off += wlen
                len -= wlen
            }
        }
    }

    /**
     * Writes an 8 bit byte to a buffer.
     * @param buffer the buffer
     * @param val the value
     * @param offset the offset
     */
    private static writeByte(buffer: Buffer, val: number, offset: number): void {
        buffer.writeInt8(Stream.toByte(val), offset)
    }

    public static toShort(val: number): number {
        const int16 = new Int16Array(1)
        int16[0] = val
        return int16[0]
    }

    public static toByte(val: number): number {
        const int8 = new Int8Array(1)
        int8[0] = val
        return int8[0]
    }

    public static toInt(val: number): number {
        const int32 = new Int32Array(1)
        int32[0] = val
        return int32[0]
    }

    public static toBigint(val: number): bigint {
        const bigInt64 = new BigInt64Array(1)
        bigInt64[0] = BigInt(val)
        return bigInt64[0]
    }
}