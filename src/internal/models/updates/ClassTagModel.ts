import {TransactionReferenceModel} from "../values/TransactionReferenceModel";


/**
 * An update that states that an object belongs to a given class.
 * It is stored in blockchain by the transaction that created the
 * object and is not modified later anymore.
 */
export class ClassTagModel {
    /**
     * The name of the class of the object.
     */
    className: string

    /**
     * The transaction that installed the jar from where the class has been loaded.
     */
    jar: TransactionReferenceModel

    constructor(className: string, jar: TransactionReferenceModel) {
        this.className = className
        this.jar = jar
    }

}