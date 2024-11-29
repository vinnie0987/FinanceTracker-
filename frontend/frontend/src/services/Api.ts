import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',  // Adjust if your backend is running on a different port
});

export const fetchGoals = async () => {
  return api.get('/goals');
};

export const createGoal = async (goalData: any) => {
  return api.post('/goals', goalData);
};

export const updateGoal = async (id: number, savedAmount: number) => {
  return api.put(`/goals/${id}`, { savedAmount });
};

export const deleteGoal = async (id: number) => {
  return api.delete(`/goals/${id}`);
};
