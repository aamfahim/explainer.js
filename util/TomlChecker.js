import * as TOML from '@ltd/j-toml'
import * as os from 'os';
import path from 'path';
import { readFileSync } from 'fs';

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
