// src/pages/LandingPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../style/landing.css';

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      <h1>Track, Save, Achieve</h1> {/* Correct title */}
      <p>
        Achieve your financial goals by tracking your savings and making smarter decisions along the way.
      </p>
      <div>
        <Link to="/register" className="cta-button">Get Started</Link>
        <Link to="/login" className="login-button">Login</Link>
      </div>

      <div className="features-section">
        <h2>FEATURES</h2>
        <p>Set financial goals, track your progress, and visualize your success over time.</p>
      </div>

      <footer className="footer">
        <p>© 2024 Financial Goal Tracker | <Link to="/about">About Us</Link></p>
      </footer>
    </div>
  );
};

export default LandingPage;
