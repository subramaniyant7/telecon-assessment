const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const uploadDocument = async (formData) => {
    const response = await fetch('/api/documents', {
      method: 'POST',
      body: formData,
      headers: { ...getAuthHeader() },
    });
    return response.json();
  };
  
  export const fetchDocuments = async () => {
    const response = await fetch('/api/documents' , { headers: getAuthHeader() });  
    return response.json();
  };