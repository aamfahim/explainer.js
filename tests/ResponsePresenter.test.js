import {
    describe,
    expect,
    test,
    jest,
    afterEach,
    beforeEach
} from '@jest/globals';
import fs from 'fs';
import ResponsePresenter from '../util/ResponsePresenter.js';

jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {});

describe('ResponsePresenter', () => {
    beforeEach(() => {
        console.log = jest.fn();
    });
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should display response content in the console when no output file is specified', () => {
        const responses = [
            {
                choices: [{ message: { content: 'First response' } }],
                usage: { prompt_tokens: 10, completion_tokens: 20 }
            },
            {
                choices: [{ message: { content: 'Second response' } }],
                usage: { prompt_tokens: 15, completion_tokens: 25 }
            }
        ];

        ResponsePresenter(responses, null, false);

        expect(console.log).toHaveBeenCalledWith(
            'First response\n\n=================================================================================\n\nSecond response'
        );
    });

    test('should write response content to a file when outputFile is specified', () => {
        const responses = [
            {
                choices: [{ message: { content: 'File response' } }],
                usage: { prompt_tokens: 5, completion_tokens: 15 }
            }
        ];
        const outputFile = 'output.txt';

        ResponsePresenter(responses, outputFile, false);

        expect(fs.writeFileSync).toHaveBeenCalledWith(
            outputFile,
            'File response'
        );
        expect(console.log).toHaveBeenCalledWith(`File saved to ${outputFile}`);
    });

    test('should display token usage information when tokenUsage is true', () => {
        const responses = [
            {
                choices: [{ message: { content: 'Token usage response' } }],
                usage: { prompt_tokens: 30, completion_tokens: 40 }
            },
            {
                choices: [{ message: { content: 'Another response' } }],
                usage: { prompt_tokens: 20, completion_tokens: 35 }
            }
        ];

        ResponsePresenter(responses, null, true);

        expect(console.log).toHaveBeenCalledWith(
            '\n=================================================================================\n'
        );
        expect(console.log).toHaveBeenCalledWith('TOTAL PROMPT TOKENS:', 50);
        expect(console.log).toHaveBeenCalledWith('TOTAL RESPONSE TOKENS:', 75);
    });
});
