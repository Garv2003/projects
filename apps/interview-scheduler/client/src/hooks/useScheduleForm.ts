import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InterviewType } from '@/types/interview';
import { interviewApi } from '@/services/interviewSchedule';
import { useInterviewStore } from "@/store/interview";
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { hasConflict } from "@/utils";
import { FormData } from "@/types/hooks";

export const useScheduleForm = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const { interviews: storedInterviews } = useInterviewStore();

    const [formData, setFormData] = useState<FormData>({
        candidate_name: '',
        interviewer_name: '',
        start_time: '',
        end_time: '',
        type: '' as InterviewType,
        additional_notes: ''
    });

    const { mutate: scheduleInterview } = useMutation({
        mutationFn: interviewApi.createInterview,
        onSuccess: () => {
            toast({
                title: "Interview Scheduled",
                description: "The interview has been successfully scheduled."
            });
            queryClient.invalidateQueries({ queryKey: ['interviews'] });
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

    const validateDates = (): boolean => {
        const start = new Date(formData.start_time);
        const end = new Date(formData.end_time);
        const now = new Date();

        if (start < now) {
            toast({
                title: "Invalid Date",
                description: "Please select a future date and time.",
                variant: "destructive"
            });
            return false;
        }

        if (start > end) {
            toast({
                title: "Invalid Date",
                description: "End time must be after start time.",
                variant: "destructive"
            });
            return false;
        }

        if (end < now) {
            toast({
                title: "Invalid Date",
                description: "Please select a future date and time.",
                variant: "destructive"
            });
            return false;
        }

        if (start.getTime() === end.getTime()) {
            toast({
                title: "Invalid Date",
                description: "Start and end times must be different.",
                variant: "destructive"
            });
            return false;
        }

        if (hasConflict(storedInterviews, formData)) {
            toast({
                title: "Scheduling Conflict",
                description: "This time slot conflicts with an existing interview.",
                variant: "destructive"
            });
            return false;
        }

        return true;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateDates()) {
            scheduleInterview(formData);
        }
    };

    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleNavigateBack = () => {
        navigate('/');
    };

    return {
        formData,
        handleInputChange,
        handleSubmit,
        handleNavigateBack
    };
};
