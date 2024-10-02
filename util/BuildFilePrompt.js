import fs from 'fs';
import ArgsChecker from "./ArgsChecker.js";

/**
 * Builds a prompt for explaining each code block in a given file.
 * 
 * @param {string} file_path - The path of the file to be explained.
 * @throws {Error} If the content is missing or values are not defined properly.
 * @throws {Error} If the file specified by the file path is not found.
 * @returns {string} The prompt for explaining each code block in the file.
 */
const BuildFilePrompt = (file_path) => {
    if (!ArgsChecker([file_path], 1)) {
        throw new Error(`content is missing or values are not defined properly`);
    }
    if (!fs.existsSync(file_path)) {
        throw new Error(`File ${file_path} not found!`);
    }

    const fileContent = fs.readFileSync(file_path, 'utf8');

    return `Explain each code block in the following file by adding comments: \n\n${fileContent}\n\n`;
}

export default BuildFilePrompt;