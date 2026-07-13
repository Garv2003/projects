import { useState, useEffect } from 'react';
import { toast } from "sonner";
import { useNavigate } from 'react-router';
import { useQuizStore } from '@/store/quizStore';
import { initDB, saveAttempt, getAllAttempts, clearAttempts } from '@/utils/indexedDB';
import type { QuizAttempt } from '@/types';

export const useQuiz = () => {
    const { questions, setFinishQuiz, totalTime } = useQuizStore();
    const navigate = useNavigate();

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(totalTime);
    const [isActive, setIsActive] = useState(true);
    const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
    const [showHistory, setShowHistory] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((time) => time - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            if (currentQuestion === questions.length - 1) {
                if (selectedAnswer !== null && selectedAnswer === questions[currentQuestion].correctAnswer) {
                    setScore(prevScore => prevScore + 1);
                }
                finishQuiz();
            } else {
                handleNext();
            }
        }

        return () => clearInterval(interval);
    }, [timeLeft, isActive, currentQuestion, selectedAnswer]);

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

    const handleAnswerSelect = (index: number) => {
        setSelectedAnswer(index);
    };

    const handleNext = () => {
        if (selectedAnswer !== null) {
            if (selectedAnswer === questions[currentQuestion].correctAnswer) {
                setScore(score + 1);
            }
        }

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
            setTimeLeft(totalTime);
        } else {
            finishQuiz();
        }
    };

    const finishQuiz = async () => {
        setIsActive(false);

        const newAttempt: QuizAttempt = {
            date: new Date(),
            score: score,
            totalQuestions: questions.length,
            timeSpent: (totalTime - timeLeft) + (currentQuestion * totalTime)
        };

        try {
            await saveAttempt(newAttempt);
            const updatedAttempts = await getAllAttempts();
            setAttempts(updatedAttempts);
            toast("Quiz attempt saved successfully!");
            setFinishQuiz({ score, questions });
            navigate('/quiz-finish');
        } catch (error) {
            toast.error("Failed to save quiz attempt");
        }
    };

    const handleClearHistory = async () => {
        try {
            await clearAttempts();
            setAttempts([]);
            toast("Quiz history cleared successfully!");
        } catch (error) {
            toast.error("Failed to clear quiz history");
        }
    };

    return {
        currentQuestion,
        selectedAnswer,
        timeLeft,
        questions,
        showHistory,
        isLoading,
        attempts,
        handleAnswerSelect,
        handleNext,
        handleClearHistory,
        setShowHistory
    };
};
