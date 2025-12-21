import { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import TopicCard from './TopicCard';
import type { Topic } from '../types/models';

export default function TopicList() {
    const [topics, setTopics] = useState<Topic[]>([]);

    useEffect(() => { 
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8000/topics", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const data = await response.json()
                setTopics(data.payload.data)
            } catch (err) {
                console.error(err);
            }
        }

        fetchData()
    },[])

    return (
        <Stack>
            {topics?.map((topic) => (
                <div key={topic.id}>
                    <TopicCard id = {topic.id} title = {topic.title} description = {topic.description} count = {0}/>
                </div>
            ))}
        </Stack>
    );
}