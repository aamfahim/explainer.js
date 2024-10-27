import fs from 'fs';
import path from 'path';
import ArgsChecker from './ArgsChecker.js';

/**
 * Resolves file paths from the given array of paths. If a path is a directory,
 * it includes all files within that directory. If a path is a file, it includes
 * that file. Throws an error if the path is invalid or if no valid files are found.
 *
 * @param {string[]} paths - An array of file or directory paths to resolve.
 * @returns {string[]} - An array of resolved file paths.
 * @throws {Error} - Throws an error if the paths argument is missing or invalid,
 *                   if a path is invalid, or if no valid files are found.
 */
const FilePathResolver = (paths) => {
    if (!ArgsChecker([paths], 1)) {
        throw new Error(`paths is missing or values are not defined properly`);
    }

    const filesToProcess = [];

    for (const givenPath of paths) {
        if (fs.lstatSync(givenPath).isDirectory()) {
            const filesInDirectory = fs
                .readdirSync(givenPath)
                .map((file) => path.join(givenPath, file))
                .filter((filePath) => fs.lstatSync(filePath).isFile());
            filesToProcess.push(...filesInDirectory);
        } else if (fs.lstatSync(givenPath).isFile()) {
            filesToProcess.push(givenPath);
        } else {
            throw new Error(`Invalid path: ${givenPath}`);
        }
    }

    if (filesToProcess.length === 0) {
        throw new Error('No valid files found to process.');
    }

    return filesToProcess;
};

export default FilePathResolver;
