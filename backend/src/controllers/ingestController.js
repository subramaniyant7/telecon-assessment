import { Request, Response } from 'express';
import Document from '../models/documentModel';
import { generateEmbeddings } from '../services/embeddingService';

export const triggerIngestion = async (req, res) => {
    const { documentId } = req.body;
    const document = await Document.findById(documentId);
    if (!document) return res.status(404).json({ message: 'Document not found' });

    const embeddings = await generateEmbeddings(document.filePath);
    // Save embeddings to PostgreSQL with pgvector
    res.json({ message: 'Ingestion completed', embeddings });
};