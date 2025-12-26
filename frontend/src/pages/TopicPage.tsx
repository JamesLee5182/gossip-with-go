import { useParams, Link } from 'react-router-dom';
import PostList from '../components/PostsList';
import CreatePostForm from '../components/CreatePostForm';
import { Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { getTopic } from '../api/topics';

export default function TopicPage() {
    const { id } = useParams<{ id: string }>()

    const { data: topic, isLoading, error } = useQuery({
        queryKey: ['topics', 'detail', id],
        queryFn: () => getTopic(id || ""),
        enabled: !!id,
    });
    
    if (error) return <div>Error Loading Topic</div>
    if (isLoading) return <div>Loading Topic</div>
    if (!topic) return <div>Topic not found.</div>
    
    return (
        <Stack>
            <Typography variant="h3">
                {topic.title}
            </Typography>

            <Typography variant="h6">
                {topic.description}
            </Typography>

            <CreatePostForm topic_id={topic.id}/>

            <PostList topic_id={topic.id}/>
        </Stack>
    )
}