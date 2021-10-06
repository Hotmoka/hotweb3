/// <reference types="node" />
import { MarshallingContext } from "./MarshallingContext";
/**
 * An object that can be marshalled into a stream.
 */
export declare abstract class Marshallable {
    /**
     * Marshals this object into a buffer.
     * @return the buffer of bytes
     */
    protected marshall(): Buffer;
    /**
     * Marshals this object into a marshalling context without flushing.
     * @return the marshalling Context
     */
    protected marshallObject(): MarshallingContext;
    /**
     * Marshals this object into a given stream.
     * @param context the context holding the stream
     */
    protected abstract into(context: MarshallingContext): void;
}
