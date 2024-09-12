/**
 * Creates a new instance of Groq using the provided apiKey and baseURL.
 * @param {string} apiKey - The API key for authentication.
 * @param {string} baseURL - The base URL for the Groq instance.
 * @returns {Groq} - The new instance of Groq.
 * @throws {Error} - If apiKey or baseURL are missing or not defined properly.
 */
import Groq from "groq-sdk";
import ArgsChecker from "../ArgsChecker";

export default GroqInstance = (apiKey, baseURL) => {
    if (!ArgsChecker(arguments, 2)) {
        throw new Error('apiKey and baseURL are missing or values are not defined properly');
    }    

    return new Groq({
        apiKey: apiKey,
        baseURL: baseURL,
    });
}
