/**
 * Checks if the number of arguments matches the expected count and if all arguments are defined.
 * 
 * @param {Array} args - The arguments to be checked.
 * @param {number} expectedCount - The expected number of arguments.
 * @returns {boolean} - Returns true if the number of arguments matches the expected count and all arguments are defined, otherwise returns false.
 */
const ArgsChecker = (args, expectedCount) => {
    return args.length === expectedCount && args.every(arg => arg !== undefined && arg !== null);
}

export default ArgsChecker;