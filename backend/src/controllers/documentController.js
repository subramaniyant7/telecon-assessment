import { Request, Response } from 'express';
import Document from '../models/documentModel';
import fs from 'fs';
import path from 'path';

export const uploadDocument = async (req, res) => {
    const { originalname, path: filePath } = req.file!;
    const newPath = path.join(__dirname, '../../uploads', originalname);
    fs.renameSync(filePath, newPath);

    const document = new Document({ name: originalname, filePath: newPath, uploadedBy: (req as any).user.userId });
    await document.save();
    res.status(201).json({ message: 'Document uploaded successfully' });
};

export const getDocuments = async (req, res) => {
    const documents = await Document.find({ uploadedBy: (req).user.userId });
    res.json(documents);
};