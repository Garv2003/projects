import {
    InterviewResponse,
    CreateInterviewDto,
    InterviewByIdResponse
} from '@/types/interview';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const interviewApi = {
    getInterviews: async (): Promise<InterviewResponse> => {
        const response = await axios.get(`${API_URL}/v1/interview/interviews`);
        return response.data;
    },

    getInterviewById: async (id: string): Promise<InterviewByIdResponse> => {
        const response = await axios.get(`${API_URL}/v1/interview/${id}`);
        return response.data;
    },

    createInterview: async (interview: CreateInterviewDto): Promise<InterviewResponse> => {
        const response = await axios.post(`${API_URL}/v1/interview/create`, interview);
        return response.data;
    },

    updateInterview: async ({ id, interview }: { id: string, interview: CreateInterviewDto }): Promise<InterviewResponse> => {
        const response = await axios.put(`${API_URL}/v1/interview/${id}`, interview);
        return response.data;
    },

    deleteInterview: async (id: string): Promise<void> => {
        await axios.delete(`${API_URL}/v1/interview/${id}`);
    },
};

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default interviewApi;