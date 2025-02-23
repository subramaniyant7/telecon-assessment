import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <Link to="/upload">Upload Document</Link>
      <Link to="/documents">Documents</Link>
      <Link to="/qa">Q&A</Link>
    </nav>
  );
};

export default Navbar;