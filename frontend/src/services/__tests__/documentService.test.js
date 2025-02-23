import { uploadDocument, fetchDocuments } from '../services/documentService';

global.fetch = jest.fn();

describe('documentService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('uploadDocument API call', async () => {
        (fetch).mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({ message: 'Document uploaded successfully' }),
        });

        const formData = new FormData();
        formData.append('file', new File(['test content'], 'test.pdf', { type: 'application/pdf' }));

        const response = await uploadDocument(formData);
        expect(response.message).toBe('Document uploaded successfully');
    });

    test('fetchDocuments API call', async () => {
        (fetch).mockResolvedValue({
            ok: true,
            json: () => Promise.resolve([{ id: '1', name: 'Document 1' }]),
        });

        const response = await fetchDocuments();
        expect(response).toEqual([{ id: '1', name: 'Document 1' }]);
    });

    test('uploadDocument API call failure', async () => {
        (fetch).mockRejectedValue(new Error('Upload failed'));

        const formData = new FormData();
        formData.append('file', new File(['test content'], 'test.pdf', { type: 'application/pdf' }));

        await expect(uploadDocument(formData)).rejects.toThrow('Upload failed');
    });

    test('fetchDocuments API call failure', async () => {
        (fetch).mockRejectedValue(new Error('Failed to fetch documents'));

        await expect(fetchDocuments()).rejects.toThrow('Failed to fetch documents');
    });
});