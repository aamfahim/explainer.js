import * as TOML from '@ltd/j-toml';
import * as os from 'os';
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
    } catch (err) {
        console.error('Error parsing the TOML file:', err);
        process.exit(1);
    }
};

export default TomlChecker;
