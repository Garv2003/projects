import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { authApi } from '@/services/auth';
import { useAuthStore } from "@/store/auth";

export const useMainLayout = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(true);

    const setAuth = useAuthStore((state) => state.setAuth);
    const clearAuth = useAuthStore((state) => state.clearAuth);

    useEffect(() => {
        const fetchUser = async () => {
            setIsLoading(true);

            try {
                const { user, message } = await authApi.getCurrentUser();
                setAuth(user, localStorage.getItem('token'));
                toast({
                    title: 'Success',
                    description: message,
                });
            } catch (err) {
                navigate('/login');
                return null;
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, [navigate, setAuth, toast]);

    const handleLogout = () => {
        clearAuth();
        localStorage.removeItem('token');
        toast({
            title: 'Logout successful',
            description: 'You have been logged out successfully.',
        });
        navigate('/login');
    };

    return {
        isLoading,
        handleLogout,
    };
};
