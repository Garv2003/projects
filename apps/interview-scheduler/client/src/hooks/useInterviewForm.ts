import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { useToast } from "@/hooks/use-toast";
import { useInterviewStore } from "@/store/interview";
import { Interview } from '@/types/interview';
import { interviewApi } from '@/services/interviewSchedule';
import { hasConflict } from "@/utils";

export const useInterviewForm = () => {
    const { interviewId } = useParams();
    const navigate = useNavigate();
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const { interviews: storedInterviews } = useInterviewStore();
    const [formData, setFormData] = useState<Interview | null>(null);

    const { data: interview, isLoading, isError, error } = useQuery({
        queryKey: ['interview', interviewId],
        queryFn: () => interviewApi.getInterviewById(interviewId!),
        enabled: !!interviewId
    });

    const { mutate: updateInterview, isPending } = useMutation({
        mutationFn: async ({ interview, id }: { interview: Interview; id: string }) => {
            return await interviewApi.updateInterview({ interview, id });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['interviews'] });
            toast({
                title: "Interview Updated",
                description: "The interview has been successfully updated."
            });
            navigate('/');
        },
        onError: (error: Error) => {
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive"
            });
        }
    });

    useEffect(() => {
        if (interview?.data) {
            setFormData(interview.data);
        }
    }, [interviewId, interview]);

    const validateDateTime = (formData: Interview): boolean => {
        if (new Date(formData.start_time) < new Date()) {
            toast({
                title: "Invalid Date",
                description: "Please select a future date and time.",
                variant: "destructive"
            });
            return false;
        }

        if (new Date(formData.start_time) > new Date(formData.end_time)) {
            toast({
                title: "Invalid Date",
                description: "End time must be after start time.",
                variant: "destructive"
            });
            return false;
        }

        if (new Date(formData.end_time) < new Date()) {
            toast({
                title: "Invalid Date",
                description: "Please select a future date and time.",
                variant: "destructive"
            });
            return false;
        }

        if (new Date(formData.start_time).getTime() === new Date(formData.end_time).getTime()) {
            toast({
                title: "Invalid Date",
                description: "Start and end times must be different.",
                variant: "destructive"
            });
            return false;
        }

        return true;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData) return;

        if (!validateDateTime(formData)) {
            return;
        }

        const newStoredInterviews = [...storedInterviews.filter(interview => interview._id !== interviewId)];

        if (hasConflict(newStoredInterviews, formData)) {
            toast({
                title: "Scheduling Conflict",
                description: "This time slot conflicts with an existing interview.",
                variant: "destructive"
            });
            return;
        }

        updateInterview({ interview: formData, id: interviewId! });
    };

    const handleInputChange = (field: keyof Interview, value: string) => {
        setFormData(prev => prev ? { ...prev, [field]: value } : null);
    };

    const handleBack = () => navigate('/');

    return {
        formData,
        isLoading,
        isError,
        error,
        isPending,
        handleSubmit,
        handleInputChange,
        handleBack
    };
};