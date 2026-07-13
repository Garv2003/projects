import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

import { QuestionCard } from '@/components/custom/QuestionCard';
import { HistoryDialog } from "@/components/custom/HistoryDialog";

import { Timer, History } from 'lucide-react';
import { useQuiz } from '@/hooks/useQuiz';

const Quiz = () => {
    const {
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
    } = useQuiz();

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-50 p-8">
            <Card className="w-full max-w-4xl mx-auto">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Interactive Quiz Platform</CardTitle>
                        <Button
                            variant="outline"
                            onClick={() => setShowHistory(true)}
                        >
                            <History className="mr-2 h-4 w-4" /> History
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <Badge variant="outline">
                                Question {currentQuestion + 1}/{questions.length}
                            </Badge>
                            <Badge
                                variant={timeLeft <= 10 ? "destructive" : "secondary"}
                                className="transition-colors"
                            >
                                <Timer className="mr-2 h-4 w-4" />
                                {timeLeft}s
                            </Badge>
                        </div>
                        <Progress
                            value={(timeLeft / 30) * 100}
                            className={timeLeft <= 10 ? "text-red-500" : ""}
                        />
                        <QuestionCard
                            question={questions[currentQuestion].question}
                            options={questions[currentQuestion].options}
                            handleAnswerSelect={handleAnswerSelect}
                            selectedAnswer={selectedAnswer}
                            timeLeft={timeLeft}
                        />
                        <Button
                            className="w-full"
                            onClick={handleNext}
                            disabled={selectedAnswer === null || timeLeft === 0}
                        >
                            {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
                        </Button>
                    </div>
                </CardContent>
            </Card>
            <HistoryDialog
                showHistory={showHistory}
                setShowHistory={setShowHistory}
                isLoading={isLoading}
                attempts={attempts}
                handleClearHistory={handleClearHistory}
            />
        </div>
    );
};

export default Quiz;