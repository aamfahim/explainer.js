/**
 * Generates a prompt message with the given content.
 *
 * @param {string} content - The content to be included in the prompt message.
 * @returns {string} - The generated prompt message.
 * @throws {Error} - If the content is missing or values are not defined properly.
 */
import ArgsChecker from "./ArgsChecker.js";

const Prompt = (content) => {
    if (!ArgsChecker([content], 1)) {
        throw new Error(`content is missing or values are not defined properly`);
    }

    return `Explain each code block in the following file by adding comments: \n\n${content}\n\n`;
} 

export default Prompt;