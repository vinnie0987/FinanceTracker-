// LoginPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importing useNavigate for redirection
import '../style/login.css';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>(''); // State for handling errors
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset error state before trying to log in again
    setError('');

    // Validate credentials using a backend API
    try {
      const response = await fetch('http://localhost:3000/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        // Log the response error data for debugging
        const errorData = await response.json();
        console.log('Error response:', errorData); // Debugging line
        throw new Error(errorData.message || 'Invalid credentials');
      }

      const data = await response.json();
      console.log('Response data:', data); // Log the response data for debugging

      // If login is successful, navigate to the home page
      // Since the JWT token is set as a cookie, no need to manually handle it in frontend
      navigate('/home');
    } catch (err: any) {
      // Handle any errors (network issues, invalid credentials, etc.)
      setError(`An error occurred: ${err.message}`);
      console.error('Error:', err);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Track, Save, Achieve</h1>
        {error && <p className="error-message">{error}</p>} {/* Display error message if there's an error */}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Log In
          </button>
        </form>
        <p className="signup-link">
          Don't have an account? <a href="/register">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
