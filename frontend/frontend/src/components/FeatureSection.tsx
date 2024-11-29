// FeatureSection.tsx
import React from 'react';

const FeatureSection: React.FC = () => {
    return (
        <section className="feature-section">
            <h2 className="section-title">Features</h2>
            <div className="feature">
                <h3>Create Goals</h3>
                <p>Set and manage your financial goals based on your income and expenses.</p>
            </div>
            <div className="feature">
                <h3>Track Progress</h3>
                <p>Monitor your progress with real-time updates on goal completion.</p>
            </div>
            <div className="feature">
                <h3>Visualization</h3>
                <p>View your goal completion over time with easy-to-understand visualizations.</p>
            </div>
        </section>
    );
};

export default FeatureSection;
