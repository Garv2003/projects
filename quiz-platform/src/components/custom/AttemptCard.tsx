import { Card, CardContent } from "@/components/ui/card"
import type { QuizAttempt } from "@/types"

export const AttemptCard = ({ attempt }: { attempt: QuizAttempt }) => {
    return (
        <Card>
            <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="font-medium">
                            Score: {attempt.score}/{attempt.totalQuestions}
                            <span className="ml-2 text-sm text-gray-500">
                                ({((attempt.score / attempt.totalQuestions) * 100).toFixed(1)}%)
                            </span>
                        </p>
                        <p className="text-sm text-gray-500">
                            Time: {attempt.timeSpent}s
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-gray-500">
                            {new Date(attempt.date).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-500">
                            {new Date(attempt.date).toLocaleTimeString()}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}