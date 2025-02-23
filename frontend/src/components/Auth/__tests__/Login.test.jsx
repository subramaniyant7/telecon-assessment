import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../../components/Auth/Login';
import { login } from '../../services/authService';

jest.mock('../../services/authService');

describe('Login Component', () => {
    test('renders login form', () => {
        render(<Login />);
        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
    });

    test('calls login API on form submission', async () => {
        (login).mockResolvedValue({ token: 'fake-token' });
        render(<Login />);

        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
        fireEvent.click(screen.getByRole('button', { name: 'Login' }));

        expect(login).toHaveBeenCalledWith('test@example.com', 'password123');
    });

    test('displays error message on login failure', async () => {
        (login).mockRejectedValue(new Error('Invalid credentials'));
        render(<Login />);

        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'wrongpassword' } });
        fireEvent.click(screen.getByRole('button', { name: 'Login' }));

        expect(await screen.findByText('Invalid credentials')).toBeInTheDocument();
    });
});