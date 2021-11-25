import {Buffer} from "buffer";

/**
 * A class to write a stream to a buffer with automatic grow of the capacity.
 */
export class BufferedStream {
    private buffer = Buffer.alloc(32)
    private count = 0

    /**
     * Returns the used content of the buffer.
     * @return the buffer
     */
    public getBuffer(): Buffer {
        return this.buffer.slice(0, this.count)
    }

    /**
     * Writes length bytes from the buffer buff starting at offset offset to the internal buffer.
     * @param buff the buffer
     * @param offset the starting offset of buff
     * @param length the length bytes to be copied from buff
     */
    public write(buff: Buffer, offset: number, length: number): void {
        this.ensureCapacity(this.count + length)
        buff.copy(this.buffer, this.count, offset, length)
        this.count += length
    }

    /**
     * Writes the complete content of buffer buff to the internal buffer.
     * @param buff the buffer
     */
    public writeBuffer(buff: Buffer): void {
        this.write(buff, 0, buff.length)
    }

    /**
     * Increases the capacity if necessary to ensure that it can hold at least the number of elements specified by the minimum capacity argument.
     * @param minCapacity the desired minimum capacity
     */
    private ensureCapacity(minCapacity: number): void {
        if (minCapacity - this.buffer.length > 0) {
            this.grow(minCapacity)
        }
    }

    /**
     * Increases the capacity to ensure that it can hold at least the number of elements specified by the minimum capacity argument.
     * @param minCapacity the desired minimum capacity
     */
    private grow(minCapacity: number): void {
        const oldCapacity = this.buffer.length
        let newCapacity = oldCapacity << 1

        if (newCapacity - minCapacity < 0) {
            newCapacity = minCapacity
        }

        this.buffer = this.copyOf(this.buffer, newCapacity)
    }

    /**
     * Returns a copy of the specified array.
     * @param original the array to be copied
     * @param length the length of the copy to be returned
     */
    private copyOf(original: Buffer, length: number): Buffer {
        const copy = Buffer.alloc(length)
        original.copy(copy, 0, 0, Math.min(original.length, length))
        return copy
    }
}