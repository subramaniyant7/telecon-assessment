import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import documentRoutes from './routes/documentRoutes';
import ingestRoutes from './routes/ingestRoutes';
import { authenticate } from './middleware/authMiddleware';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI!)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', authenticate, userRoutes);
app.use('/api/documents', authenticate, documentRoutes);
app.use('/api/ingest', authenticate, ingestRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));