/**
 * The model holding the name of the algorithm used to sign requests.
 */
export class SignatureAlgorithmResponseModel {
    /**
     * The name of the algorithm used to sign requests.
     */
    algorithm: string

    constructor(algorithm: string) {
        this.algorithm = algorithm
    }
}