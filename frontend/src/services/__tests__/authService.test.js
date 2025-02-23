import { login, register } from '../services/authService';

global.fetch = jest.fn();

describe('authService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('login API call', async () => {
        (fetch).mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({ token: 'fake-token' }),
        });

        const response = await login('test@example.com', 'password123');
        expect(response.token).toBe('fake-token');
    });

    test('register API call', async () => {
        (fetch).mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({ message: 'User registered successfully' }),
        });

        const response = await register('test@example.com', 'password123', 'viewer');
        expect(response.message).toBe('User registered successfully');
    });
});