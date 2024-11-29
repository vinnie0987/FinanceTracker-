import React from "react";

interface Goal {
  id: number;
  title: string;
  targetAmount: number;
  dueDate: string;
  currentAmount: number;  
}

interface GoalListProps{
    goals: Goal[];
}

const GoalList: React.FC<GoalListProps> = ({goals}) => {
    return (
        <div>
            {goals.length > 0 ? (
                <ul>
                    {goals.map((goal) => (
                <li key= {goal.id}>
                    <h3>{goal.title}</h3>
                    <p>Target Amount: ${goal.targetAmount}</p>
                    <p>Current Amount Saved: ${goal.currentAmount}</p>
                    <p>Due Date: {goal.dueDate}</p>
                </li>
            ))}
            </ul>
        ) : (
            <p>No goals to display</p>

        )}
        </div>

    );
};


export default GoalList;