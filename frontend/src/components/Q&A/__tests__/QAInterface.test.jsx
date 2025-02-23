import { render, screen, fireEvent } from '@testing-library/react';
import QAInterface from '../../components/Q&A/QAInterface';
import { askQuestion } from '../../services/qaService';

jest.mock('../../services/qaService');

describe('QAInterface Component', () => {
    test('renders Q&A form', () => {
        render(<QAInterface />);
        expect(screen.getByPlaceholderText('Ask a question')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Ask' })).toBeInTheDocument();
    });

    test('calls askQuestion API on form submission', async () => {
        (askQuestion).mockResolvedValue({ answer: 'This is the answer' });
        render(<QAInterface />);

        fireEvent.change(screen.getByPlaceholderText('Ask a question'), { target: { value: 'What is this?' } });
        fireEvent.click(screen.getByRole('button', { name: 'Ask' }));

        expect(askQuestion).toHaveBeenCalledWith('What is this?');
        expect(await screen.findByText('This is the answer')).toBeInTheDocument();
    });

    test('displays error message on Q&A failure', async () => {
        (askQuestion).mockRejectedValue(new Error('Failed to fetch answer'));
        render(<QAInterface />);

        fireEvent.change(screen.getByPlaceholderText('Ask a question'), { target: { value: 'What is this?' } });
        fireEvent.click(screen.getByRole('button', { name: 'Ask' }));

        expect(await screen.findByText('Failed to fetch answer')).toBeInTheDocument();
    });
});