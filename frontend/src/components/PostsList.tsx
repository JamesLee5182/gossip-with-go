import { useState, useEffect } from "react";
import type { Post } from "../types/models"
import PostCard from "./PostCard";

type PostListProps = {
    topicId: number
}

export default function PostList({topicId} : PostListProps) {
    const [posts, setPosts] = useState<Post[]>([])

    useEffect(() => {
        const fetchData = async () => { 
            try {
                const response = await fetch(`http://localhost:8000/topics/${topicId}/posts`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }) 

                const data = await response.json()
                setPosts(data.payload.data)
            } catch (err) {
                console.error(err)
            }
        }

        fetchData()
    }, [])

    if (posts.length == 0) {
        return (
            <div>No posts yet</div>
        );
    }

    return (
        <div>
            {posts?.map((post) => (
                <div key={post.id}>
                    <PostCard id={post.id} title={post.title} content={post.content} user_id={post.user_id} topic_id={post.topic_id} created_at={post.created_at} edited_at={post.edited_at}/>
                </div>
            ))}
        </div>
    );
}