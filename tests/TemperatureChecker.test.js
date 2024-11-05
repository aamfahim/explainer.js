import { describe, expect, test } from '@jest/globals';
import TemperatureChecker from '../util/TemperatureChecker';

describe('TemperatureChecker', () => {
    test('should return the temperature if it is between 0 and 2', () => {
        expect(TemperatureChecker(0)).toBe(0);
        expect(TemperatureChecker(1)).toBe(1);
        expect(TemperatureChecker(2)).toBe(2);
    });

    test('should throw an error if the temperature is less than 0', () => {
        expect(() => TemperatureChecker(-1)).toThrow(
            'Temperature should be a number between 0 and 2'
        );
    });

    test('should throw an error if the temperature is greater than 2', () => {
        expect(() => TemperatureChecker(3)).toThrow(
            'Temperature should be a number between 0 and 2'
        );
    });

    test('should throw an error if the temperature is not a number', () => {
        expect(() => TemperatureChecker('a')).toThrow(
            'Temperature should be a number between 0 and 2'
        );
        expect(() => TemperatureChecker(null)).toThrow(
            'Temperature should be a number between 0 and 2'
        );
        expect(() => TemperatureChecker(undefined)).toThrow(
            'Temperature should be a number between 0 and 2'
        );
    });
});
