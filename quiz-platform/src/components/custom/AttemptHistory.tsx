import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import type { AttemptHistoryProps } from '@/types'

export const AttemptHistory = ({ attempts, isLoading, onClearHistory, calculatePercentage }: AttemptHistoryProps) => (
    <CardContent className="max-w-2xl w-full">
        <CardHeader>
            <CardTitle>Attempt History</CardTitle>
        </CardHeader>

        {isLoading ? (
            <div className="text-center py-4">Loading history...</div>
        ) : attempts.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
                No attempts yet. Take a quiz to see your history!
            </div>
        ) : (
            <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                {attempts.map((attempt, index) => (
                    <Card key={index}>
                        <CardContent className="pt-6">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-medium">
                                        Score: {attempt.score}/{attempt.totalQuestions}
                                        <span className="ml-2 text-sm text-gray-500">
                                            ({calculatePercentage(attempt.score, attempt.totalQuestions)}%)
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
                ))}
            </div>
        )}

        <CardFooter className='mt-5 w-full flex justify-end'>
            <Button
                variant="destructive"
                onClick={onClearHistory}
                disabled={attempts.length === 0}
            >
                <Trash2 className="mr-2 h-4 w-4" />
                Clear History
            </Button>
        </CardFooter>
    </CardContent>
);
