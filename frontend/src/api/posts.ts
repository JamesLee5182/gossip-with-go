import { BASE_URL } from "./config";
import type { Post } from "../types/models";

const ErrFetchPost = "Error fetching posts"
const ErrCreatePost = "Error creating posts"
const ErrDeletePost = "Error deleting post"

export const getPost = async (post_id: string): Promise<Post> => {
    const response = await fetch(`${BASE_URL}/posts/${post_id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    })

    if (!response.ok) throw new Error(ErrFetchPost)
    
    const data = await response.json()
    return data.payload.data
}

export const getPostsByTopic = async (topic_id: number): Promise<Post[]> => {
    const response = await fetch(`${BASE_URL}/topics/${topic_id}/posts`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    })

    if (!response.ok) throw new Error(ErrFetchPost)

    const data = await response.json();
    return data.payload.data; 
}

export const createPost = async (post_Data: { title: string; content: string; user_id: number; topic_id: number}) => {
    const response = await fetch(`${BASE_URL}/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post_Data),
    })

    if (!response.ok) throw new Error(ErrCreatePost)
    
    return response.json();
}

export const deletePost = async (id : string) => {
    const response = await fetch(`${BASE_URL}/posts/${id}`, {
        method: "DELETE",
    })

    if (!response.ok) throw new Error(ErrDeletePost)
    
    return response.json();
}