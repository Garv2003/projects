import { topics } from '@/constants/topics';
import { TopicCard } from './TopicCard';
import { useTopicSelection } from '@/hooks/useTopicSelection';

export const TopicList = () => {
    const { selectedTopics, handleTopicToggle } = useTopicSelection();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topics.map((topic) => (
                <TopicCard
                    key={topic.id}
                    topic={topic}
                    isSelected={selectedTopics.some(t => t.id === topic.id)}
                    onToggle={() => handleTopicToggle(topic)}
                />
            ))}
        </div>
    );
};
