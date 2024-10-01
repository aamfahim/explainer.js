import TOML from '@ltd/j-toml';
import os from 'os';
import path from 'path';
import { readFileSync, existsSync } from 'fs';

/**
 * Checks if the .explainer-config.toml file exists in the user's home directory,
 * and returns the options in it if valid. Returns an empty object if the file doesn't exist.
 *
 * @returns {Record<string, any>} - An object containing attributes from the TOML file, or an empty object if the file doesn't exist.
 * @throws {Error} - If the file exists but cannot be parsed as a valid TOML file.
 */
const TomlChecker = () => {
    const tomlFile = path.join(os.homedir(), '.explainer-config.toml');

    if (!existsSync(tomlFile)) {
        return {};
    }

    try {
        const finalPath = path.resolve(tomlFile);
        const fileContents = readFileSync(finalPath, 'utf8');
        return TOML.parse(fileContents);
    }
    catch (error) {
        throw new Error(`TOML parsing failed: ${error.message}`);
    }

};

export default TomlChecker;
