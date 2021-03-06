import {Marshallable} from "../../marshalling/Marshallable";
import {createHash} from 'crypto'
import {TransactionReferenceModel} from "../values/TransactionReferenceModel";
import {Buffer} from "buffer";


export abstract class TransactionRequestModel extends Marshallable {

    /**
     * Yields the reference to the transaction generated by this request.
     * @param signature the signature of this request in base64
     * @return the transaction reference or null
     */
    public getReference(signature: string): TransactionReferenceModel | null {
        try {
            const marshallingContext = this.marshallObject()
            const signatureBuffer = Buffer.from(signature || '', 'base64')
            marshallingContext.writeCompactInt(signatureBuffer.length)
            marshallingContext.writeBuffer(signatureBuffer)
            marshallingContext.flush()

            const bytes = marshallingContext.getBuffer()
            const hash = createHash('sha256').update(bytes).digest('hex')
            return new TransactionReferenceModel('local', hash)
        } catch (e) {
            return null
        }
    }
}