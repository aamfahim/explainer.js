import { describe, test, expect, beforeEach, afterEach } from '@jest/globals';
import BuildFilePrompt from '../util/BuildFilePrompt.js';
import fs from 'fs';
import path from 'path';

describe('BuildFilePrompt', () => {
    const testFilePath = path.join(process.cwd(), 'test.txt');

    beforeEach(() => {
        fs.writeFileSync(testFilePath, 'Test content');
    });

    afterEach(() => {
        if (fs.existsSync(testFilePath)) {
            fs.unlinkSync(testFilePath);
        }
    });

    test('should generate correct prompt for valid file', () => {
        const result = BuildFilePrompt(testFilePath);
        expect(result).toBe(
            'Explain each code block in the following file by adding comments: \n\nTest content\n\n'
        );
    });

    test('should throw error when file path is not provided', () => {
        expect(() => BuildFilePrompt()).toThrow(
            'content is missing or values are not defined properly'
        );
    });

    test('should throw error when file path is empty string', () => {
        expect(() => BuildFilePrompt('')).toThrow('File  not found!');
    });

    test('should throw error when file does not exist', () => {
        const nonExistentPath = 'nonexistent.txt';
        expect(() => BuildFilePrompt(nonExistentPath)).toThrow(
            `File ${nonExistentPath} not found!`
        );
    });
});
