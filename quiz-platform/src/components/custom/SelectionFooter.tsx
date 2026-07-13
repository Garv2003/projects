import { Button } from "@/components/ui/button";
import { XCircle } from 'lucide-react';
import { useTopicSelection } from '@/hooks/useTopicSelection';

export const SelectionFooter = () => {
    const { selectedTopics, resetStore, handleStartQuiz } = useTopicSelection();

    return (
        <div className="w-full flex flex-col space-y-4">
            <div className="w-full flex justify-between items-center">
                <p className="text-sm text-gray-500">
                    Selected Topics: {selectedTopics.length}
                </p>
                <Button variant="ghost" onClick={resetStore} disabled={selectedTopics.length === 0}>
                    <XCircle className="h-4 w-4 mr-2" />
                    Clear Selection
                </Button>
            </div>
            <Button className="w-full" size="lg" onClick={handleStartQuiz}>
                Start Quiz Setup
            </Button>
        </div>
    );
};
