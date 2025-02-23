import React, { useState } from 'react';
import { uploadDocument } from '../../services/documentService';

const UploadDocument = () => {
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      await uploadDocument(formData);
      alert('Document uploaded successfully');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} required />
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadDocument;