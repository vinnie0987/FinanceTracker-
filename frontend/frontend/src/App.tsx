import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './style/global.css';  
import './style/landing.css'; 
import './style/login.css';   
import './style/register.css';
import './style/home.css';

// Importing pages
import LandingPage from './pages/LandingPage';  
import LoginPage from './pages/LoginPage';      
import RegisterPage from './pages/RegisterPage';
import Home from './pages/Home'; 
import NotFound from './pages/Notfound';  

const App: React.FC = () => {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<LandingPage />} />  {/* Landing page as the homepage */}
                    <Route path="/login" element={<LoginPage />} />  {/* Login page route */}
                    <Route path="/register" element={<RegisterPage />} />  {/* Register page route */}
                    <Route path="/home" element={<Home />} />  {/* Home page after successful login */}
                    <Route path="*" element={<NotFound />} />  {/* NotFound page route for undefined paths */}
                </Routes>
            </div>
        </Router>
    );
};

export default App;
