// NotFound.js

import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  const notFoundStyle = {
    textAlign: 'center',
    marginTop: '100px',
    padding: '20px',
    backgroundColor: '#f2f2f2',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
  };

  const buttonStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  return (
    <div style={notFoundStyle}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/">
        <button style={buttonStyle}>Back</button>
      </Link>
    </div>
  );
};

export default NotFound;
