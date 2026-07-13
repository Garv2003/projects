import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

import { QuizAttempt } from "@/types"
import { AttemptCard } from "./AttemptCard"

export const HistoryDialog = ({ showHistory, setShowHistory, isLoading, attempts, handleClearHistory }: { showHistory: boolean, setShowHistory: (show: boolean) => void, isLoading: boolean, attempts: QuizAttempt[], handleClearHistory: () => void }) => {
    return (
        <Dialog open={showHistory} onOpenChange={setShowHistory}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Attempt History</DialogTitle>
                </DialogHeader>
                {isLoading ? (
                    <div className="text-center py-4">Loading history...</div>
                ) : attempts.length === 0 ? (
                    <div className="text-center py-4 text-gray-500">
                        No attempts yet. Take a quiz to see your history!
                    </div>
                ) : (
                    <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                        {attempts.map((attempt, index) => (
                            <AttemptCard key={index} attempt={attempt} />
                        ))}
                    </div>
                )}
                <DialogFooter>
                    <Button
                        variant="destructive"
                        onClick={handleClearHistory}
                        disabled={attempts.length === 0}
                    >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Clear History
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}