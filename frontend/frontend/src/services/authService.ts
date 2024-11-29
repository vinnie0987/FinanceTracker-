import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

export const loginUser = async (credentials: { email: string; password: string }) => {
    const response = await axios.post(`${API_URL}/login`, credentials);
    localStorage.setItem('token', response.data.token); // Store JWT token
    return response.data;
};

export const registerUser = async (data: { email: string; password: string }) => {
    const response = await axios.post(`${API_URL}/register`, data);
    return response.data;
};
