import {HotmokaException} from "../exceptions/HotmokaException";

/**
 * Base58 is a way to encode Bitcoin addresses (or arbitrary data) as alphanumeric strings.
 * <p>
 * Note that this is not the same base58 as used by Flickr, which you may find referenced around the Internet.
 * <p>
 * Satoshi explains: why base-58 instead of standard base-64 encoding?
 * <ul>
 * <li>Don't want 0OIl characters that look the same in some fonts and
 *     could be used to create visually identical looking account numbers.</li>
 * <li>A string with non-alphanumeric characters is not as easily accepted as an account number.</li>
 * <li>E-mail usually won't line-break if there's no punctuation to break at.</li>
 * <li>Doubleclicking selects the whole number as one word if it's all alphanumeric.</li>
 * </ul>
 * <p>
 * However, note that the encoding/decoding runs in O(n&sup2;) time, so it is not useful for large data.
 * <p>
 * The basic idea of the encoding is to treat the data bytes as a large number represented using
 * base-256 digits, convert the number to be represented using base-58 digits, preserve the exact
 * number of leading zeros (which are otherwise lost during the mathematical operations on the
 * numbers), and finally represent the resulting base-58 digits as alphanumeric ASCII characters.
 */
export class Base58 {
    private static readonly ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
    private static readonly ENCODED_ZERO = "1"
    private static readonly INDEXES = Base58.init()

    private static init() {
        const indexes = new Array(128)
        indexes.fill(-1)
        for (let i = 0; i < Base58.ALPHABET.length; i++) {
            indexes[Base58.ALPHABET.charAt(i).charCodeAt(0)] = i
        }

        return indexes
    }

    /**
     * Encodes the given string in base58 string (no checksum is appended).
     * @param inputStr the bytes to encode
     * @return the base58-encoded string
     */
    public static encode(inputStr: string): string {
        if (!inputStr || inputStr.length == 0) {
            return ""
        }

        const input = Buffer.from(inputStr)
        // Count leading zeros.
        let zeros = 0
        while (zeros < input.length && input[zeros] == 0) {
            ++zeros;
        }
        // Convert base-256 digits to base-58 digits (plus conversion to ASCII characters)
        const encoded = new Array(input.length * 2) // upper bound
        let outputStart = encoded.length;
        for (let inputStart = zeros; inputStart < input.length; ) {
            encoded[--outputStart] = this.ALPHABET.charAt(Base58.divmod(input, inputStart, 256, 58))
            if (input[inputStart] == 0) {
                ++inputStart; // optimization - skip leading zeros
            }
        }
        // Preserve exactly as many leading encoded zeros in output as there were leading zeros in input.
        while (outputStart < encoded.length && encoded[outputStart] == Base58.ENCODED_ZERO) {
            ++outputStart;
        }
        while (--zeros >= 0) {
            encoded[--outputStart] = this.ENCODED_ZERO;
        }

        // Return encoded string (including encoded leading zeros).
        return encoded.slice(outputStart).join('').normalize()
    }

    /**
     * Decodes the given base58 string into the original data bytes.
     * @param input the base58-encoded string to decode
     * @return the decoded data bytes
     * @throws HotmokaException if the given string is not a valid base58 string
     */
    public static decode(input: string): Buffer {
        if (!input || input.length == 0) {
            return Buffer.alloc(0)
        }

        // Convert the base58-encoded ASCII chars to a base58 byte sequence (base58 digits).
        const input58 = Buffer.alloc(input.length)
        for (let i = 0; i < input.length; ++i) {
            const c = input.charAt(i).charCodeAt(0)
            const digit = c < 128 ? Base58.INDEXES[c] : -1
            if (digit < 0) {
                throw new HotmokaException("Invalid character in Base58 encoding: " + c)
            }
            input58[i] = digit
        }
        // Count leading zeros.
        let zeros = 0;
        while (zeros < input58.length && input58[zeros] == 0) {
            ++zeros;
        }
        // Convert base-58 digits to base-256 digits.
        const decoded = Buffer.alloc(input.length)
        let outputStart = decoded.length;
        for (let inputStart = zeros; inputStart < input58.length; ) {
            decoded[--outputStart] = Base58.divmod(input58, inputStart, 58, 256)
            if (input58[inputStart] == 0) {
                ++inputStart; // optimization - skip leading zeros
            }
        }
        // Ignore extra leading zeroes that were added during the calculation.
        while (outputStart < decoded.length && decoded[outputStart] == 0) {
            ++outputStart;
        }
        // Return decoded data (including original number of leading zeros).
        return decoded.slice(outputStart - zeros, decoded.length)
    }

    /**
     * Divides a number, represented as an array of bytes each containing a single digit
     * in the specified base, by the given divisor. The given number is modified in-place
     * to contain the quotient, and the return value is the remainder.
     * @param number the number to divide
     * @param firstDigit the index within the array of the first non-zero digit
     *        (this is used for optimization by skipping the leading zeros)
     * @param base the base in which the number's digits are represented (up to 256)
     * @param divisor the number to divide by (up to 256)
     * @return the remainder of the division operation
     */
    private static divmod(number: Buffer, firstDigit: number, base: number, divisor: number): number {
        let remainder = 0
        for (let i = firstDigit; i < number.length; i++) {
            const digit = number[i] & 0xFF
            const temp = remainder * base + digit
            number[i] = temp / divisor
            remainder = temp % divisor
        }
        return remainder
    }
}