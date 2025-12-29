import TopicCard from './TopicCard';
import { useQuery } from '@tanstack/react-query';
import { getTopics } from '../api/topics';

export default function TopicList() {
    const {data: topics, isLoading, error} = useQuery({
        queryKey: ['topics', 'list', 0],
        queryFn: getTopics
    })

    if (error) return <div>Error Loading Topics</div>
    if (isLoading) return <div>Loading Topics</div>
    if (topics == null || topics.length == 0) return <div>No Topics yet.</div>

    return (
        <div>
            {topics?.map((topic) => (
                <div key={topic.id}>
                    <TopicCard id = {topic.id} title = {topic.title} description = {topic.description}/>
                </div>
            ))}
        </div>
    );
}