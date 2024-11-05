import { describe, test, expect, beforeEach, afterEach } from '@jest/globals';
import mock from 'mock-fs';
import FilePathResolver from '../util/FilePathResolver.js';

describe('FilePathResolver with mocked file system', () => {
    beforeEach(() => {
        // Mock the file system structure
        mock({
            dir: {
                'file1.txt': 'Content of file1',
                'file2.txt': 'Content of file2',
                subdir: {
                    'file3.txt': 'Content of file3'
                }
            },
            emptyDir: {}, // Empty directory to test "no valid files"
            'file1.txt': 'Content of single file',
            'file2.txt': 'Content of another file',
            invalidPath: mock.directory({ mode: 0o000 }) // Inaccessible path to simulate invalid path
        });
    });

    afterEach(() => {
        // Restore the real file system after each test
        mock.restore();
    });

    test('should throw an error if paths argument is missing or invalid', () => {
        expect(() => FilePathResolver()).toThrow(
            'paths is missing or values are not defined properly'
        );
    });

    test('should throw an error if no valid files are found', () => {
        expect(() => FilePathResolver(['emptyDir'])).toThrow(
            'No valid files found to process.'
        );
    });

    test('should throw an error if a path is invalid', () => {
        expect(() => FilePathResolver(['invalidPath'])).toThrow(
            'Invalid path: invalidPath'
        );
    });

    test('should resolve file paths from directories', () => {
        const result = FilePathResolver(['dir']);
        expect(result).toEqual(['dir\\file1.txt', 'dir\\file2.txt']);
    });

    test('should resolve file paths from files', () => {
        const result = FilePathResolver(['file1.txt', 'file2.txt']);
        expect(result).toEqual(['file1.txt', 'file2.txt']);
    });

    test('should handle a mix of files and directories', () => {
        const result = FilePathResolver(['file1.txt', 'dir']);
        expect(result).toEqual([
            'file1.txt',
            'dir\\file1.txt',
            'dir\\file2.txt'
        ]);
    });
});
