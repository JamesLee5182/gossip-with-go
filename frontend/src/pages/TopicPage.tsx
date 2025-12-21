import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { Topic } from '../types/models';

export default function TopicPage() {
    const { id } = useParams<{ id: string }>();

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

                    console.log(response)
                    const data = await response.json()
                    setTopic(data.payload.data)
                } catch (err) {
                    console.error(err);
                }
            }

            fetchData()
        }
    }, [id]);

    if (!topic) return <div>Loading topic...</div>;

    return (
        <div>
            posts for {topic.title} go here.
        </div>
    );
}