import { describe, expect, test, afterEach, beforeEach } from '@jest/globals';
import ExtractOptions from '../util/ExtractOptions.js';
import mock from 'mock-fs';
import fs from 'fs';
import os from 'os';
import path from 'path';
import TOML from '@ltd/j-toml';

const createMockTomlFile = (filePath, content) => {
    fs.writeFileSync(filePath, content);
};

describe('ExtractOptions', () => {
    const tomlFilePath = path.join(os.homedir(), '.explainer-config.toml');

    beforeEach(() => {
        mock({
            [os.homedir()]: {}
        });
    });

    afterEach(() => {
        mock.restore();
    });

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
        const tomlContent = `
            apiKey = "api-key"
            baseURL = "https://api.groq.com/"
            temperature = 0.5
            model = "toml-model"
            output = "toml.txt"
            tokenUsage = false
        `;

        createMockTomlFile(tomlFilePath, tomlContent);

        const options = {};
        const tomlConfig = TOML.parse(fs.readFileSync(tomlFilePath, 'utf-8'));

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
