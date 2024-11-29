import React from 'react';
import '../style/home.css';

const Home: React.FC = () => {
  // Mock data for demonstration
  const goals = [
    { id: 1, name: 'Vacation Fund', amount: 5000, progress: 40, category: 'Savings', dueDate: '2024-12-31' },
    { id: 2, name: 'Credit Card Debt', amount: 3000, progress: 70, category: 'Debt', dueDate: '2024-06-15' },
    { id: 3, name: 'Emergency Fund', amount: 2000, progress: 20, category: 'Savings', dueDate: '2024-05-20' },
  ];

  const upcomingDeadlines = goals
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 3);

  return (
    <div className="home-layout">
      {/* Header */}
      <header className="header">
        <div className="header-item">
          <h2>Total Goals</h2>
          <p>{goals.length}</p>
        </div>
        <div className="header-item">
          <h2>Goals Completed</h2>
          <p>{goals.filter(goal => goal.progress === 100).length}</p>
        </div>
        <div className="header-item">
          <h2>Goals In Progress</h2>
          <p>{goals.filter(goal => goal.progress < 100).length}</p>
        </div>
      </header>

      {/* Main content */}
      <div className="main-content">
        {/* Upcoming Deadlines */}
        <section className="upcoming-deadlines">
          <h3>Upcoming Deadlines</h3>
          <ul>
            {upcomingDeadlines.map(goal => (
              <li key={goal.id}>
                <strong>{goal.name}</strong> - Due: {goal.dueDate}
              </li>
            ))}
          </ul>
        </section>

        {/* All Goals List */}
        <section className="all-goals">
          <h3>All Goals</h3>
          {goals.map(goal => (
            <div key={goal.id} className="goal-item">
              <h4>{goal.name}</h4>
              <p>Category: {goal.category}</p>
              <p>Amount: ${goal.amount}</p>
              <p>Progress: {goal.progress}%</p>
              <div className="actions">
                <button>Update Progress</button>
                <button>Delete</button>
              </div>
            </div>
          ))}
        </section>
      </div>

      {/* Sidebar/Widget */}
      <aside className="sidebar">
        <h3>Quick Actions</h3>
        <button className="add-goal">+ Add Goal</button>
        <div className="progress-bar-container">
          {goals.map(goal => (
            <div key={goal.id}>
              <label>{goal.name}</label>
              <div className="progress-bar-wrapper">
                <div className="progress-bar" style={{ width: `${goal.progress}%` }} />
              </div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
};

export default Home;
