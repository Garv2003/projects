import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { registerSchema } from '@/feature/auth/validation';
import { authApi } from '@/services/auth';
import * as z from 'zod';

export type RegisterFormValues = z.infer<typeof registerSchema>;

export const useRegisterForm = () => {
    const { toast } = useToast();
    const navigate = useNavigate();

    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const registerMutation = useMutation({
        mutationFn: authApi.register,
        onSuccess: () => {
            toast({
                title: 'Success',
                description: 'Registered successfully',
            });
            navigate('/login');
        },
        onError: (error: any) => {
            console.log(error);
            toast({
                title: 'Error',
                description: error.response?.data.message,
                variant: 'destructive',
            });
        },
    });

    const onSubmit = (values: RegisterFormValues) => {
        registerMutation.mutate(values);
    };

    return {
        form,
        isLoading: registerMutation.isPending,
        onSubmit: form.handleSubmit(onSubmit),
    };
};

