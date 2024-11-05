import { describe, test, expect } from '@jest/globals';
import ArgsChecker from '../util/ArgsChecker.js';

describe('ArgsChecker', () => {
    test('returns true when the number of arguments matches the expected count and all arguments are defined', () => {
        const args = [1, 2, 3];
        const expectedCount = 3;
        expect(ArgsChecker(args, expectedCount)).toBe(true);
    });

    test('returns false when the number of arguments does not match the expected count', () => {
        const args = [1, 2];
        const expectedCount = 3;
        expect(ArgsChecker(args, expectedCount)).toBe(false);
    });

    test('returns false when one of the arguments is undefined', () => {
        const args = [1, undefined, 3];
        const expectedCount = 3;
        expect(ArgsChecker(args, expectedCount)).toBe(false);
    });

    test('returns false when one of the arguments is null', () => {
        const args = [1, null, 3];
        const expectedCount = 3;
        expect(ArgsChecker(args, expectedCount)).toBe(false);
    });

    test('returns true when there are no arguments and expected count is zero', () => {
        const args = [];
        const expectedCount = 0;
        expect(ArgsChecker(args, expectedCount)).toBe(true);
    });
});
