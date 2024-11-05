import { describe, test, expect } from '@jest/globals';
import ExtractOptions from '../util/ExtractOptions.js';

describe('ExtractOptions', () => {
    test('should use options when tomlConfig values are undefined', () => {
        const options = {
            apiKey: 'test-key',
            baseURL: 'http://test.com',
            temperature: 0.7,
            model: 'test-model',
            output: 'output.txt',
            tokenUsage: true
        };
        const tomlConfig = {};

        const result = ExtractOptions(options, tomlConfig);

        expect(result).toEqual({
            apiKey: 'test-key',
            baseURL: 'http://test.com',
            temperature: 0.7,
            model: 'test-model',
            outputFile: 'output.txt',
            tokenUsage: true
        });
    });

    test('should use tomlConfig when options values are undefined', () => {
        const options = {};
        const tomlConfig = {
            apiKey: 'api-key',
            baseURL: 'https://api.groq.com/',
            temperature: 0.5,
            model: 'toml-model',
            output: 'toml.txt',
            tokenUsage: false
        };

        const result = ExtractOptions(options, tomlConfig);

        expect(result).toEqual({
            apiKey: 'api-key',
            baseURL: 'https://api.groq.com/',
            temperature: 0.5,
            model: 'toml-model',
            outputFile: 'toml.txt',
            tokenUsage: false
        });
    });
});
