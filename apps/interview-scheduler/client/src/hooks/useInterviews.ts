import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { interviewApi } from '@/services/interviewSchedule';
import { useInterviewStore } from "@/store/interview";
import { Interview } from '@/types/interview';
import { useToast } from "@/hooks/use-toast";

export const useInterviews = () => {
    const { toast } = useToast();
    const [filteredInterviews, setFilteredInterviews] = useState<Interview[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [view, setView] = useState('month');

    const { interviews, setInterviews } = useInterviewStore();

    const { data: interviewsData, isLoading, refetch: refetchInterviews } = useQuery({
        queryKey: ['interviews'],
        queryFn: () => interviewApi.getInterviews(),
    });

    const { mutate: deleteInterview, isPending } = useMutation({
        mutationFn: (id: string) => interviewApi.deleteInterview(id),
        onSuccess: () => {
            refetchInterviews();
            setDeleteId(null);
            toast({
                title: "Interview Deleted",
                description: "The interview has been successfully removed.",
            });
        },
        onError: () => {
            toast({
                title: "Error",
                description: "Failed to delete the interview.",
                variant: "destructive",
            });
        }
    });

    useEffect(() => {
        if (interviewsData) {
            setInterviews(interviewsData.data.interviews);
            setFilteredInterviews(interviewsData.data.interviews);
        }
    }, [interviewsData]);

    useEffect(() => {
        let filtered = [...interviews];
        if (searchQuery) {
            filtered = filtered.filter(
                interview =>
                    interview.candidate_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    interview.interviewer_name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        if (selectedType && selectedType !== 'all') {
            filtered = filtered.filter(interview => interview.type === selectedType);
        }
        setFilteredInterviews(filtered);
    }, [searchQuery, selectedType, interviews]);

    const calendarEvents = filteredInterviews.map(interview => ({
        id: interview._id,
        title: `${interview.candidate_name} - ${interview.type}`,
        start: new Date(interview.start_time),
        end: new Date(new Date(interview.end_time)),
        interview: interview,
    }));

    const handleDelete = () => {
        if (!deleteId) return;
        deleteInterview(deleteId);
    };

    return {
        filteredInterviews,
        searchQuery,
        setSearchQuery,
        selectedType,
        setSelectedType,
        deleteId,
        setDeleteId,
        view,
        setView,
        calendarEvents,
        handleDelete,
        isLoading,
        isPending
    };
};
