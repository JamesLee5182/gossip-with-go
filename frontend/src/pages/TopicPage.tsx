import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PostList from '../components/PostsList';
import type { Topic } from '../types/models';
import CreatePostForm from '../components/CreatePostForm';
import { Stack } from '@mui/material';

export default function TopicPage() {
    const { id } = useParams<{ id: string }>()

    const [topic, setTopic] = useState<Topic>()

    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                try {
                    const response = await fetch(`http://localhost:8000/topics/${id}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    })

                    const data = await response.json()
                    setTopic(data.payload.data)
                } catch (err) {
                    console.error(err)
                }
            }

            fetchData()
        }
    }, [id]);

    if (!topic) {
        return <div>Loading topic...</div>
    }
    
    return (
        <Stack>
            <CreatePostForm user_id={1} topic_id={topic.id}/>
            <PostList topicId={topic.id}/>
        </Stack>
    )
}