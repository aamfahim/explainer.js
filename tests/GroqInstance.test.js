import { describe, expect, jest, test } from '@jest/globals';
import GroqInstance from '../util/GroqInstance';
import { Groq } from 'groq-sdk';
jest.mock('groq-sdk');

describe('GroqInstance', () => {
    const validApiKey = 'validApiKey';
    const validBaseURL = 'https://valid.base.url';

    test('should create a new instance of Groq with valid apiKey and baseURL', () => {
        const instance = GroqInstance(validApiKey, validBaseURL);
        expect(instance).toBeInstanceOf(Groq);
    });

    test('should throw an error if apiKey or baseURL are missing or not defined properly', () => {
        expect(() => {
            GroqInstance(null, validBaseURL);
        }).toThrow(
            'apiKey & baseURL are missing or values are not defined properly'
        );

        expect(() => {
            GroqInstance(validApiKey, null);
        }).toThrow(
            'apiKey & baseURL are missing or values are not defined properly'
        );

        expect(() => {
            GroqInstance(null, null);
        }).toThrow(
            'apiKey & baseURL are missing or values are not defined properly'
        );
    });
});
