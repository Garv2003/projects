import { AuthResponse, LoginCredentials, RegisterCredentials, User } from '@/types/auth';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const authApi = {
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        const response = await axios.post(`${API_URL}/v1/auth/login`, credentials);
        return response.data;
    },

    register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
        const response = await axios.post(`${API_URL}/v1/auth/register`, credentials);
        return response.data;
    },

    getCurrentUser: async (): Promise<{ user: User; message: string; success: boolean }> => {
        const response = await axios.get(`${API_URL}/v1/auth/me`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    }
};

