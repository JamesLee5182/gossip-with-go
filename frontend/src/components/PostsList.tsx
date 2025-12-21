import { useState, useEffect } from "react";

type PostListProps = {
    topicId: number
}

export default function PostList({topicId} : PostListProps) {
    useEffect(() => {
        const fetchData = async () => { 
            const response = await fetch('http://localhost:8000/topics/${topicId}/posts') 
        }

        fetchData()
    }, [])
}