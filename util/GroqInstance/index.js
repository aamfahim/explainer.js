import Groq from "groq-sdk"

export default GroqInstance = (apiKey, baseURL) => {
    if (arguments.length < 2 || arguments.some(arg => arg === undefined)) {
        throw new Error('apiKey and baseUrl are required');
    }

    return new Groq({
        apiKey: apiKey,
        baseURL: baseURL,
    });
}
