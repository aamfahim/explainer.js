import ArgsChecker from "./ArgsChecker.js";

/**
 * Process a file with a given provider.
 * 
 * @param {Object} provider - The provider object.
 * @param {string} prompt - The prompt for the chat completion.
 * @param {string} model - The model for the chat completion.
 * @param {number} temperature - The temperature for the chat completion.
 * @returns {Promise<Object>} - The response from the provider.
 * @throws {Error} - If any of the required arguments are missing or not defined properly, or if provider processing fails.
 */
const processFileWithProvider = async (provider, prompt, model, temperature) => {
    if (!ArgsChecker([provider, prompt, model, temperature], 4)) {
        throw new Error(`provider, prompt, model, temperature are missing or values are not defined properly`);
    }

    try {
        const response = await provider.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: model,
            temperature: temperature,
        });

        return response
    } catch (error) {
        throw new Error(`Provider processing failed: ${error.message}`);
    }
}

export default processFileWithProvider;
