import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { shuffle } from 'lodash';
import { questionsByTopic } from '@/constants/questions';
import type { Question } from '@/types';
import { useQuizStore } from '../store/quizStore';

const QuizSetup = () => {
    const navigate = useNavigate();
    const { selectedTopics, setQuestions, totalTime, setTotalTime } = useQuizStore();
    const [questionsPerTopic, setQuestionsPerTopic] = useState(5);
    const [maxQuestionsPerTopic, setMaxQuestionsPerTopic] = useState(5);

    useEffect(() => {
        if (selectedTopics.length === 0) return;

        // Find the minimum available questions across topics
        const minAvailableQuestions = selectedTopics.reduce((min, topic) =>
            Math.min(min, topic.totalQuestions || 0), 5);
        setMaxQuestionsPerTopic(minAvailableQuestions);
        setQuestionsPerTopic(minAvailableQuestions);
    }, [selectedTopics]);

    const handleStartQuiz = () => {
        if (selectedTopics.length === 0) {
            console.error("No topics selected.");
            return;
        }

        let allQuestions: Question[] = [];

        selectedTopics.forEach(topic => {
            const topicQuestions = questionsByTopic[topic.id] || [];
            if (topicQuestions.length > 0) {
                const selectedQuestions = shuffle(topicQuestions).slice(0, questionsPerTopic);
                allQuestions.push(...selectedQuestions);
            }
        });

        if (allQuestions.length === 0) {
            console.error("No questions available for the selected topics.");
            return;
        }

        setQuestions(shuffle(allQuestions));
        navigate('/quiz');
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-50 p-8">
            <Card className="w-full max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle>Quiz Configuration</CardTitle>
                    <CardDescription>
                        Customize your quiz settings for {selectedTopics.map(t => t.name).join(', ')}
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-8">
                    <div className="space-y-4">
                        <h3 className="font-medium">Questions per Topic</h3>
                        <Slider
                            value={[questionsPerTopic]}
                            onValueChange={(value) => setQuestionsPerTopic(value[0])}
                            min={1}
                            max={maxQuestionsPerTopic}
                            step={1}
                            className="w-full"
                        />
                        <p className="text-sm text-gray-500">
                            {questionsPerTopic} questions from each topic (Total: {questionsPerTopic * selectedTopics.length} questions)
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-medium">Time per Question (seconds)</h3>
                        <Slider
                            value={[totalTime]}
                            onValueChange={(value) => setTotalTime(value[0])}
                            min={15}
                            max={120}
                            step={15}
                            className="w-full"
                        />
                        <p className="text-sm text-gray-500">
                            {totalTime} seconds per question (Total: {Math.round((totalTime * questionsPerTopic * selectedTopics.length) / 60)} minutes)
                        </p>
                    </div>

                    <div className="bg-gray-100 rounded-lg p-4">
                        <h3 className="font-medium mb-2">Quiz Summary</h3>
                        <ul className="space-y-2 text-sm">
                            <li>Topics: {selectedTopics.map(t => t.name).join(', ')}</li>
                            <li>Total Questions: {questionsPerTopic * selectedTopics.length}</li>
                            <li>Time Limit: {Math.round((totalTime * questionsPerTopic * selectedTopics.length) / 60)} minutes</li>
                        </ul>
                    </div>
                </CardContent>

                <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => navigate('/')}>
                        Back to Topics
                    </Button>
                    <Button onClick={handleStartQuiz}>
                        Start Quiz
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default QuizSetup;