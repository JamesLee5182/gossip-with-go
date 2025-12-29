import { useParams } from 'react-router-dom';
import PostList from '../components/PostsList';
import CreatePostForm from '../components/CreatePostForm';
import { Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { deleteTopic, getTopic } from '../api/topics';
import { canDelete } from '../utils/userUtils';
import { useAuth } from '../context/AuthContext';
import DeleteButton from '../components/DeleteButton';

export default function TopicPage() {
    const { id } = useParams<{ id: string }>()

    const { user } = useAuth()

    const { data: topic, isLoading, error } = useQuery({
        queryKey: ['topics', 'detail', id],
        queryFn: () => getTopic(id || ""),
        enabled: !!id,
    })

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

            {canDelete(user, topic) && 
                <DeleteButton 
                    item_id={id} 
                    deleteFn={deleteTopic} 
                    navigateAfterDelete='/'
                    queryKey={['topics', 'list', `${id}`]}
                />
            }

            <CreatePostForm topic_id={topic.id}/>

            <PostList topic_id={topic.id}/>
        </Stack>
    )
}