/**
 * Checks the temperature value.
 *
 * @param {number} temp - The temperature value to be checked.
 * @returns {number} - The checked temperature value.
 * @throws {Error} - If the temperature value is not a number between 0 and 2.
 */
const TemperatureChecker = (temp) => {
    if (isNaN(temp) || temp < 0 || temp > 2) {
        throw new Error('Temperature should be a number between 0 and 2');
    }
    return temp;
};

export default TemperatureChecker;
