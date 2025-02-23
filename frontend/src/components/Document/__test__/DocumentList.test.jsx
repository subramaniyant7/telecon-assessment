import { render, screen } from '@testing-library/react';
import DocumentList from '../../components/Document/DocumentList';
import { fetchDocuments } from '../../services/documentService';

jest.mock('../../services/documentService');

describe('DocumentList Component', () => {
    test('renders document list', async () => {
        (fetchDocuments).mockResolvedValue([
            { id: '1', name: 'Document 1' },
            { id: '2', name: 'Document 2' },
        ]);

        render(<DocumentList />);

        expect(await screen.findByText('Document 1')).toBeInTheDocument();
        expect(await screen.findByText('Document 2')).toBeInTheDocument();
    });

    test('displays error message on fetch failure', async () => {
        (fetchDocuments).mockRejectedValue(new Error('Failed to fetch documents'));
        render(<DocumentList />);

        expect(await screen.findByText('Failed to fetch documents')).toBeInTheDocument();
    });
});