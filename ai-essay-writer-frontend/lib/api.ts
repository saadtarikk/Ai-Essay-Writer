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
    console.log('Creating user with data:', userData);
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

export const login = async (email: string, password: string) => {
  console.log('Attempting to sign in with:', { email });
  const response = await fetch('http://localhost:3000/auth/login', {
    
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
    
  });
  console.log('Attempting to sign in with:', { email });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Login failed');
  }

  return response.json();
  console.log('Attempting to sign in with:', { email });
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

export const generateEssay = async (topic: string): Promise<string> => {
  console.log('generateEssay called with topic:', topic);
  try {
    const response = await fetch('http://localhost:3000/essays/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ topic }),
    });
    if (!response.ok) {
      throw new Error('Failed to generate essay');
    }
    const data = await response.json();
    console.log('Essay generation response:', data);
    return data.essay;
  } catch (error) {
    console.error('Error generating essay:', error);
    throw error;
  }
};

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { source, style } = await request.json();
  
  // TODO: Implement actual citation generation logic
  const citation = `Generated citation for "${source}" in ${style} style`;

  return NextResponse.json({ citation });
}

export const createEssay = async (essayData: Partial<Essay>): Promise<Essay> => {
  try {
    const response = await api.post('/essays', essayData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create essay');
  }
};

// Make sure all these functions are exported
