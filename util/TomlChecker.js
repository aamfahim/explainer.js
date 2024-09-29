import * as TOML from '@ltd/j-toml'
import * as os from 'os';
import path from 'path';
import { readFileSync } from 'fs';

/**
 * Checks if the provided Toml file is valid and returns the options in it.
 *
 * @param {string} tomlFile - the full file path/name of the TOML file provided by the user.
 * @returns {Record<string, any>} - An object containing as attributes all the options in the provided TOML file.
 * @throws {Error} - If the file provided cannot be read, not a valid TOML file, or does not exist.
 */
const TomlChecker = (tomlFile) => {
    let config = {};

    if(tomlFile)
    {
        if(tomlFile.startsWith('~'))
        {
            tomlFile = path.join(os.homedir(), tomlFile.slice(1));
        }

        const finalPath = path.resolve(tomlFile);
        const fileContents = readFileSync(finalPath, 'utf8');
        config = TOML.parse(fileContents);

        return config;
    }
    return config;
};

export default TomlChecker;
