import Groq from 'groq-sdk';
import ArgsChecker from './ArgsChecker.js';

/**
 * Creates a new instance of Groq using the provided apiKey and baseURL.
 * @param {string} apiKey - The API key for authentication.
 * @param {string} baseURL - The base URL for the Groq instance.
 * @returns {Groq} - The new instance of Groq.
 * @throws {Error} - If apiKey or baseURL are missing or not defined properly.
 */
const GroqInstance = (apiKey, baseURL) => {
    if (!ArgsChecker([apiKey, baseURL], 2)) {
        console.log(apiKey, baseURL);
        throw new Error(
            `apiKey & baseURL are missing or values are not defined properly`
        );
    }

    return new Groq({
        apiKey: apiKey,
        baseURL: baseURL
    });
};

export default GroqInstance;
