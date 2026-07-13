import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, BookOpen } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import type { TopicCardProps } from '@/types';

export const TopicCard = ({ topic, isSelected, onToggle }: TopicCardProps) => {
    return (
        <Card
            key={topic.id}
            className={`cursor-pointer transition-all ${isSelected ? 'ring-2 ring-primary' : ''}`}
            onClick={onToggle}
        >
            <CardContent className="p-6">
                <div className="flex items-start justify-between">
                    <div>
                        <div className="flex items-center space-x-2">
                            <span className="text-2xl">{topic.icon}</span>
                            <h3 className="text-xl font-semibold">{topic.name}</h3>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">{topic.description}</p>
                    </div>
                    {isSelected && <CheckCircle2 className="h-6 w-6 text-primary" />}
                </div>
                <div className="mt-4">
                    <Badge variant="secondary">
                        <BookOpen className="h-4 w-4 mr-1" />
                        {topic.totalQuestions} questions
                    </Badge>
                </div>
            </CardContent>
        </Card>
    );
};
