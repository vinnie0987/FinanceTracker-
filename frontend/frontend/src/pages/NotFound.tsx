// src/pages/NotFound.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../style/notFound.css';  // Optional: You can style the NotFound page here

const NotFound: React.FC = () => {
  return (
    <div className="not-found-container">
      <h1>Oops! Page Not Found</h1>
      <p>It seems the page you're looking for doesn't exist.</p>
      <Link to="/" className="back-home-link">Go back to Home</Link>
    </div>
  );
};

export default NotFound;
