import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import UploadDocument from './components/Document/UploadDocument';
import DocumentList from './components/Document/DocumentList';
import QAInterface from './components/Q&A/QAInterface';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/upload" element={<UploadDocument />} />
        <Route path="/documents" element={<DocumentList />} />
        <Route path="/qa" element={<QAInterface />} />
      </Routes>
    </Router>
  );
};

export default App;