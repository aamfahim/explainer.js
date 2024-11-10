import {
    describe,
    expect,
    jest,
    test,
    beforeEach,
    afterEach
} from '@jest/globals';
import nock from 'nock';
import program from '../index.js';

nock('https://api.groq.com/openai/v1')
    .post('/chat/completions')
    .reply(200, () => {
        return {
            id: 'chatcmpl-f51b2cd2-bef7-417e-964e-a08f0b513c22',
            object: 'chat.completion',
            created: 1730241104,
            model: 'llama3-8b-8192',
            choices: [
                {
                    index: 0,
                    message: {
                        role: 'assistant',
                        content: 'Mock response'
                    },
                    logprobs: null,
                    finish_reason: 'stop'
                }
            ],
            usage: {
                queue_time: 0.037493756,
                prompt_tokens: 18,
                prompt_time: 0.000680594,
                completion_tokens: 556,
                completion_time: 0.463333333,
                total_tokens: 574,
                total_time: 0.464013927
            },
            system_fingerprint: 'fp_179b0f92c9',
            x_groq: { id: 'req_01jbd6g2qdfw2adyrt2az8hz4w' }
        };
    });

describe('CLI End-to-End Test', () => {
    let processExitSpy;
    let consoleLogSpy;

    beforeEach(() => {
        jest.resetModules();
        processExitSpy = jest
            .spyOn(process, 'exit')
            .mockImplementation((code) => {
                console.log(`process.exit called with code: ${code}`);
            });
        consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
        nock.cleanAll();
        processExitSpy.mockRestore();
        consoleLogSpy.mockRestore();
    });

    test('should process the input file, use the mock HTTP response and exit with 0', async () => {
        process.argv = ['node', 'index.js', 'examples/bubble_sort.js'];
        await program.parseAsync(process.argv);

        expect(consoleLogSpy).toHaveBeenCalledWith(
            'Processing request with provider...'
        );
        expect(consoleLogSpy).toHaveBeenCalledWith(
            expect.stringContaining('Mock response')
        );
        expect(processExitSpy).toHaveBeenCalledWith(0);
    });

    test('should exit with 1 when provided with incorrect arguments', async () => {
        process.argv = ['node', 'index.js', 'examples/bubble_sort.js', '-t', 5];
        await program.parseAsync(process.argv);
        expect(processExitSpy).toHaveBeenCalledWith(1);
    });
});
