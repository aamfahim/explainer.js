import TemperatureChecker from './TemperatureChecker.js';

/**
 * Extracts and merges options from the provided options object and the tomlConfig object.
 *
 * @param {Object} options - The options object provided by the user.
 * @param {string} options.apiKey - The API key.
 * @param {string} options.baseURL - The base URL for the API.
 * @param {number} options.temperature - The temperature setting for the API.
 * @param {string} options.model - The model to be used.
 * @param {string} options.output - The output file path.
 * @param {boolean} options.tokenUsage - Flag indicating whether to track token usage.
 * 
 * @param {Object} tomlConfig - The configuration object parsed from a TOML file.
 * @param {string} tomlConfig.apiKey - The API key from the TOML configuration.
 * @param {string} tomlConfig.baseURL - The base URL from the TOML configuration.
 * @param {number} tomlConfig.temperature - The temperature setting from the TOML configuration.
 * @param {string} tomlConfig.model - The model from the TOML configuration.
 * @param {string} tomlConfig.output - The output file path from the TOML configuration.
 * @param {boolean} tomlConfig.tokenUsage - Flag indicating whether to track token usage from the TOML configuration.
 * 
 * @returns {Object} The merged options object.
 */
const ExtractOptions = (options, tomlConfig) => {
    return {
        apiKey: options.apiKey || tomlConfig.apiKey,
        baseURL: options.baseURL || tomlConfig.baseURL,
        temperature: TemperatureChecker(options.temperature || tomlConfig.temperature),
        model: options.model || tomlConfig.model,
        outputFile: options.output || tomlConfig.output,
        tokenUsage: options.tokenUsage || tomlConfig.tokenUsage
    };
};

export default ExtractOptions;