import { create } from 'zustand';
import { Topic, Question } from '@/types';

export interface QuizState {
    selectedTopics: Topic[];
    questions: Question[];
    addTopic: (topic: Topic) => void;
    removeTopic: (topicId: string) => void;
    setQuestions: (questions: Question[]) => void;
    resetStore: () => void;
    finishQuiz: {
        score: number;
        questions: Question[];
    }
    setFinishQuiz: (finishQuiz: { score: number; questions: Question[] }) => void;
    totalTime: number;
    setTotalTime: (totalTime: number) => void;
}

export const useQuizStore = create<QuizState>((set) => ({
    selectedTopics: [],
    questions: [],
    finishQuiz: {
        score: 0,
        questions: []
    },
    totalTime: 30,
    setTotalTime: (totalTime: number) => set({ totalTime }),
    setFinishQuiz: (finishQuiz: { score: number; questions: Question[] }) => set({ finishQuiz }),
    addTopic: (topic) =>
        set((state) => ({
            selectedTopics: [...state.selectedTopics, topic]
        })),
    removeTopic: (topicId) =>
        set((state) => ({
            selectedTopics: state.selectedTopics.filter(t => t.id !== topicId)
        })),
    setQuestions: (questions) => set({ questions }),
    resetStore: () => set({ selectedTopics: [], questions: [] })
}));