import { describe, expect, test, afterEach } from '@jest/globals';
import TomlChecker from '../util/TomlChecker.js';
import mock from 'mock-fs';
import os from 'os';
import path from 'path';

describe('TomlChecker', () => {
    afterEach(() => {
        // Reset the mock file system after each test
        mock.restore();
    });

    test('should return an empty object if the TOML file does not exist', () => {
        mock({
            [os.homedir()]: {} // Mock an empty home directory
        });

        const result = TomlChecker();
        expect(result).toEqual({});
    });

    test('should return parsed data if the TOML file exists and is valid', () => {
        const tomlContent = `
            name = "explainer"
            version = "0.1.0"
        `;

        mock({
            [path.join(os.homedir(), '.explainer-config.toml')]: tomlContent
        });

        const result = TomlChecker();
        expect(result).toEqual({
            name: 'explainer',
            version: '0.1.0'
        });
    });

    test('should throw an error if the TOML file exists but is invalid', () => {
        const invalidTomlContent = `
            name = "explainer"
            version = "0.1.0
        `; // Missing closing quote for version

        mock({
            [path.join(os.homedir(), '.explainer-config.toml')]:
                invalidTomlContent
        });

        expect(() => TomlChecker()).toThrow('TOML parsing failed');
    });
});
