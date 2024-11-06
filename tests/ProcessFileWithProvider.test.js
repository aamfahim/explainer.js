import { describe, expect, test, jest, afterEach } from '@jest/globals';
import ProcessFileWithProvider from '../util/ProcessFileWithProvider.js';

describe('ProcessFileWithProvider', () => {
    const mockProvider = {
        chat: {
            completions: {
                create: jest.fn()
            }
        }
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should throw an error if any arguments are missing or not defined properly', async () => {
        await expect(
            ProcessFileWithProvider(null, 'prompt', 'model', 0.7)
        ).rejects.toThrow(
            'provider, prompt, model, temperature are missing or values are not defined properly'
        );
    });

    test('should return the response from the provider when all arguments are valid', async () => {
        const mockResponse = {
            data: 'mocked response data',
            choices: [{ message: { content: 'Mocked response content' } }]
        };

        jest.spyOn(mockProvider.chat.completions, 'create').mockResolvedValue(
            mockResponse
        );

        const result = await ProcessFileWithProvider(
            mockProvider,
            'Valid prompt',
            'test-model',
            0.7
        );

        expect(result).toBe(mockResponse);
        expect(mockProvider.chat.completions.create).toHaveBeenCalledWith({
            messages: [{ role: 'user', content: 'Valid prompt' }],
            model: 'test-model',
            temperature: 0.7
        });
    });

    test('should throw an error if provider processing fails', async () => {
        jest.spyOn(mockProvider.chat.completions, 'create').mockRejectedValue(
            new Error('Mocked error')
        );

        await expect(
            ProcessFileWithProvider(mockProvider, 'prompt', 'model', 0.7)
        ).rejects.toThrow('Provider processing failed: Mocked error');
    });
});
