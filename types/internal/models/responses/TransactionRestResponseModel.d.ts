/**
 * Class which wraps a type response model
 *
 * @param <T> the type response model
 */
export declare class TransactionRestResponseModel<T> {
    /**
     * The response model which should be an instance of {@link TransactionResponseModel}.
     */
    transactionResponseModel: T;
    /**
     * The runtime type of the response model
     */
    type: string;
    constructor(transactionResponseModel: T, type: string);
}
