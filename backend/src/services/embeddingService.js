import { HuggingFaceEmbeddings } from 'langchain/embeddings';
import fs from 'fs';

export const generateEmbeddings = async (filePath) => {
    const embeddings = new HuggingFaceEmbeddings();
    const text = fs.readFileSync(filePath, 'utf-8');
    return embeddings.embed(text);
};