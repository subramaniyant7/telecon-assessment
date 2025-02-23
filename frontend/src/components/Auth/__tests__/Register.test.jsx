import { render, screen, fireEvent } from '@testing-library/react';
import Register from '../../components/Auth/Register';
import { register } from '../../services/authService';

jest.mock('../../services/authService');

describe('Register Component', () => {
    test('renders registration form', () => {
        render(<Register />);
        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Register' })).toBeInTheDocument();
    });

    test('calls register API on form submission', async () => {
        (register).mockResolvedValue({ message: 'User registered successfully' });
        render(<Register />);

        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
        fireEvent.click(screen.getByRole('button', { name: 'Register' }));

        expect(register).toHaveBeenCalledWith('test@example.com', 'password123', 'viewer');
    });

    test('displays error message on registration failure', async () => {
        (register).mockRejectedValue(new Error('Registration failed'));
        render(<Register />);

        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
        fireEvent.click(screen.getByRole('button', { name: 'Register' }));

        expect(await screen.findByText('Registration failed')).toBeInTheDocument();
    });
});