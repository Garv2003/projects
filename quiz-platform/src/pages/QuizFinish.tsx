import { ScoreSummary } from '@/components/custom/ScoreSummary'
import { AttemptHistory } from '@/components/custom/AttemptHistory'

import { useQuizFinish } from '@/hooks/useQuizFinish'

const QuizFinish = () => {
    const {
        attempts,
        isLoading,
        score,
        questions,
        handleClearHistory,
        restartQuiz,
        calculatePercentage
    } = useQuizFinish();

    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <ScoreSummary
                score={score}
                totalQuestions={questions.length}
                percentage={calculatePercentage(score, questions.length)}
                onRestart={restartQuiz}
            />
            <AttemptHistory
                attempts={attempts}
                isLoading={isLoading}
                onClearHistory={handleClearHistory}
                calculatePercentage={calculatePercentage}
            />
        </div>
    );
};

export default QuizFinish;