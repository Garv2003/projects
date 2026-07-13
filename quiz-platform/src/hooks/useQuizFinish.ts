import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { toast } from "sonner"
import { QuizAttempt } from '@/types'
import { useQuizStore } from '@/store/quizStore'
import { clearAttempts, getAllAttempts, initDB } from "@/utils/indexedDB"

export const useQuizFinish = () => {
    const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const { resetStore, finishQuiz: { score, questions } } = useQuizStore();
    const navigate = useNavigate();

    useEffect(() => {
        const setupDB = async () => {
            try {
                await initDB();
                const savedAttempts = await getAllAttempts();
                setAttempts(savedAttempts);
            } catch (error) {
                toast.error("Failed to load quiz history");
            } finally {
                setIsLoading(false);
            }
        };
        setupDB();
    }, []);

    const handleClearHistory = async () => {
        try {
            await clearAttempts();
            setAttempts([]);
            toast("Quiz history cleared successfully!");
        } catch (error) {
            toast.error("Failed to clear quiz history");
        }
    };

    const restartQuiz = () => {
        resetStore();
        navigate('/');
    };

    const calculatePercentage = (score: number, total: number) => {
        return ((score / total) * 100).toFixed(1);
    };

    return {
        attempts,
        isLoading,
        score,
        questions,
        handleClearHistory,
        restartQuiz,
        calculatePercentage
    };
};