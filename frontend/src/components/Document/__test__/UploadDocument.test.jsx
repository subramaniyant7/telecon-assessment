import { render, screen, fireEvent } from '@testing-library/react';
import UploadDocument from '../../components/Document/UploadDocument';
import { uploadDocument } from '../../services/documentService';

jest.mock('../../services/documentService');

describe('UploadDocument Component', () => {
    test('renders file upload form', () => {
        render(<UploadDocument />);
        expect(screen.getByRole('button', { name: 'Upload' })).toBeInTheDocument();
    });

    test('calls uploadDocument API on form submission', async () => {
        (uploadDocument).mockResolvedValue({ message: 'Document uploaded successfully' });
        const file = new File(['test content'], 'test.pdf', { type: 'application/pdf' });

        render(<UploadDocument />);

        const fileInput = screen.getByLabelText('file-input');
        fireEvent.change(fileInput, { target: { files: [file] } });
        fireEvent.click(screen.getByRole('button', { name: 'Upload' }));

        expect(uploadDocument).toHaveBeenCalled();
    });

    test('displays error message on upload failure', async () => {
        (uploadDocument).mockRejectedValue(new Error('Upload failed'));
        const file = new File(['test content'], 'test.pdf', { type: 'application/pdf' });

        render(<UploadDocument />);

        const fileInput = screen.getByLabelText('file-input');
        fireEvent.change(fileInput, { target: { files: [file] } });
        fireEvent.click(screen.getByRole('button', { name: 'Upload' }));

        expect(await screen.findByText('Upload failed')).toBeInTheDocument();
    });
});