// CallToAction.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const CallToAction: React.FC = () => {
    return (
        <div className="cta-section">
            <p>Ready to take control of your financial goals?</p>
            <Link to="/register">
                <button className="cta-button">Get Started</button>
            </Link>
            <p>Already have an account?</p>
            <Link to="/login">
                <button className="cta-button">Login</button>
            </Link>
        </div>
    );
};

export default CallToAction;
