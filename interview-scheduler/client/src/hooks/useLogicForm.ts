import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { loginSchema } from '@/feature/auth/validation';
import { authApi } from '@/services/auth';
import { useAuthStore } from '@/store/auth';
import * as z from 'zod';

export type LoginFormValues = z.infer<typeof loginSchema>;

export const useLoginForm = () => {
    const { toast } = useToast();
    const navigate = useNavigate();
    const setAuth = useAuthStore((state) => state.setAuth);

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const loginMutation = useMutation({
        mutationFn: authApi.login,
        onSuccess: (data) => {
            setAuth(data.user, data.token);
            localStorage.setItem('token', data.token);
            toast({
                title: 'Success',
                description: 'Logged in successfully',
            });
            navigate('/');
        },
        onError: (error: Error) => {
            toast({
                title: 'Error',
                description: error.message,
                variant: 'destructive',
            });
        },
    });

    const onSubmit = (values: LoginFormValues) => {
        loginMutation.mutate(values);
    };

    return {
        form,
        isLoading: loginMutation.isPending,
        onSubmit: form.handleSubmit(onSubmit),
    };
};
