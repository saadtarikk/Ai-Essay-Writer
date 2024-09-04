import axios from 'axios';
import { User, Essay, CreateUserDto } from '../types';
const API_URL = 'http://localhost:3000';
// Create an axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
// Add a request interceptor to include the JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// User API
export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch users');
  }
};

export const getUserById = async (id: number): Promise<User> => {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch user with id ${id}`);
  }
};

export const createUser = async (userData: CreateUserDto): Promise<User> => {
  try {
    const response = await api.post('/users', userData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Failed to create user');
    }
    console.error('Non-Axios error:', error);
    throw new Error('Failed to create user');
  }
};

export const deleteUser = async (id: number): Promise<void> => {
  try {
    await api.delete(`/users/${id}`);
  } catch (error) {
    throw new Error(`Failed to delete user with id ${id}`);
  }
};

export const login = async (email: string, password: string): Promise<{ access_token: string }> => {
  try {
    const response = await api.post('/auth/login', { email, password });
    const { access_token } = response.data;
    localStorage.setItem('token', access_token);
    return { access_token };
  } catch (error) {
    throw new Error('Login failed');
  }
};
export const getEssays = async (): Promise<Essay[]> => {
  try {
    const response = await api.get('/essays');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch essays');
  }
};
export const deleteEssay = async (id: number): Promise<void> => {
  try {
    await api.delete(`/essays/${id}`);
  } catch (error) {
    throw new Error(`Failed to delete essay with id ${id}`);
  }
};