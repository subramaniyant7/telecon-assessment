import React, { useEffect, useState } from 'react';
import { fetchDocuments } from '../../services/documentService';

const DocumentList = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const getDocuments = async () => {
      const data = await fetchDocuments();
      setDocuments(data);
    };
    getDocuments();
  }, []);

  return (
    <div>
      <h1>Documents</h1>
      <ul>
        {documents.map((doc) => (
          <li key={doc.id}>{doc.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentList;