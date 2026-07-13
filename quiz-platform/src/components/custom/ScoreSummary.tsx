import { Trophy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { ScoreSummaryProps } from "@/types"

export const ScoreSummary = ({ score, totalQuestions, percentage, onRestart }: ScoreSummaryProps) => (
    <div className="text-center space-y-6">
        <Trophy className="h-16 w-16 mx-auto text-yellow-500" />
        <h2 className="text-2xl font-bold">Quiz Complete!</h2>
        <p className="text-lg">
            Your score: {score} out of {totalQuestions}
            <br />
            ({percentage}%)
        </p>
        <Button onClick={onRestart}>Try Again</Button>
    </div>
);