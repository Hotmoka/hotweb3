/// <reference types="node" />
/**
 * A class to write a stream to a buffer with automatic grow of the capacity.
 */
export declare class BufferedStream {
    /**
     * The buffer where data is stored.
     */
    private buffer;
    /**
     * The number of valid bytes in the buffer.
     */
    private count;
    /**
     * The maximum safe size of the buffer to allocate.
     */
    private readonly MAX_SAFE_BUFFER_SIZE;
    /**
     * The maximum size of the buffer to allocate.
     */
    private readonly MAX_BUFFER_SIZE;
    /**
     * Returns the used content of the buffer.
     * @return the buffer
     */
    getBuffer(): Buffer;
    /**
     * Writes length bytes from the buffer buff starting at offset offset to the internal buffer.
     * @param buff the buffer
     * @param offset the starting offset of buff
     * @param length the length bytes to be copied from buff
     */
    write(buff: Buffer, offset: number, length: number): void;
    /**
     * Writes the complete content of buffer buff to the internal buffer.
     * @param buff the buffer
     */
    writeBuffer(buff: Buffer): void;
    /**
     * Writes a byte to the internal buffer.
     * @param value the byte value
     */
    writeByte(value: number): void;
    writeShort(value: number): void;
    writeInt(value: number): void;
    writeFloat(value: number): void;
    writeLong(value: number): void;
    writeDouble(value: number): void;
    /**
     * Increases the capacity if necessary to ensure that it can hold at least the number of elements specified by the minimum capacity argument.
     * @param minCapacity the desired minimum capacity
     */
    private ensureCapacity;
    private hugeCapacity;
    /**
     * Increases the capacity to ensure that it can hold at least the number of elements specified by the minimum capacity argument.
     * @param minCapacity the desired minimum capacity
     */
    private grow;
    /**
     * Checks if the sub-range from fromIndex (inclusive) to fromIndex + size (exclusive) is within the bounds of range from 0 (inclusive) to length (exclusive).
     * @param fromIndex the lower-bound (inclusive) of the sub-interval
     * @param size the size of the sub-range
     * @param length the upper-bound (exclusive) of the range
     * @throws Error if the sub-range is out of bounds
     */
    private checkFromIndexSize;
    /**
     * Returns a copy of the specified array.
     * @param original the array to be copied
     * @param length the length of the copy to be returned
     */
    private copyOf;
}
