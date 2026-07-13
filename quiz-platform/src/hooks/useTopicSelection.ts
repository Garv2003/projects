import { useNavigate } from 'react-router';
import { useQuizStore } from '../store/quizStore';
import { toast } from "sonner";
import type { Topic } from '@/types';

export const useTopicSelection = () => {
    const navigate = useNavigate();
    const { selectedTopics, addTopic, removeTopic, resetStore } = useQuizStore();

    const handleTopicToggle = (topic: Topic) => {
        const isSelected = selectedTopics.some(t => t.id === topic.id);
        isSelected ? removeTopic(topic.id) : addTopic(topic);
    };

    const handleStartQuiz = () => {
        if (selectedTopics.length === 0) {
            toast.message("Selection Required", {
                description: "Please select at least one topic to start the quiz",
            });
            return;
        }
        navigate('/quiz-setup');
    };

    return {
        selectedTopics,
        handleTopicToggle,
        handleStartQuiz,
        resetStore,
    };
};
