import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    filePath: { type: String, required: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

export default mongoose.model('Document', documentSchema);