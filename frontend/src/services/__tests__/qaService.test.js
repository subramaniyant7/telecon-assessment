import { askQuestion } from '../services/qaService';

global.fetch = jest.fn();

describe('qaService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('askQuestion API call', async () => {
        (fetch).mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({ answer: 'This is the answer' }),
        });

        const response = await askQuestion('What is this?');
        expect(response.answer).toBe('This is the answer');
    });

    test('askQuestion API call failure', async () => {
        (fetch).mockRejectedValue(new Error('Failed to fetch answer'));

        await expect(askQuestion('What is this?')).rejects.toThrow('Failed to fetch answer');
    });
});