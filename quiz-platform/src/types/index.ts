export type Question = {
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
}

export type Topic = {
    id: string;
    name: string;
    description: string;
    icon: string;
    totalQuestions: number;
}

export type QuizAttempt = {
    date: Date;
    score: number;
    totalQuestions: number;
    timeSpent: number;
}

export type QuestionCardProps = {
    question: string;
    options: string[];
    handleAnswerSelect: (index: number) => void;
    selectedAnswer: number | null;
    timeLeft: number;
}

export type ScoreSummaryProps = {
    score: number;
    totalQuestions: number;
    percentage: string;
    onRestart: () => void;
}

export type AttemptHistoryProps = {
    attempts: QuizAttempt[];
    isLoading: boolean;
    onClearHistory: () => void;
    calculatePercentage: (score: number, total: number) => string;
}

export type TopicCardProps = {
    topic: Topic;
    isSelected: boolean;
    onToggle: () => void;
}