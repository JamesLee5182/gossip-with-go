import { BASE_URL } from "./config";
import type { Comment } from "../types/models";

const ErrFetchComment = "Error fetching comments"
const ErrCreateComment = "Error creating posts"
const ErrDeleteComment = "Error deleting posts"

export const getCommentsByPost = async (post_id: number): Promise<Comment[]> => {
    const response = await fetch(`${BASE_URL}/posts/${post_id}/comments`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    })

    if (!response.ok) throw new Error(ErrFetchComment)

    const data = await response.json()
    return data.payload.data
};

export const createComment = async (comment_Data: { content: string; user_id: number; post_id: number}) => {
    const response = await fetch(`${BASE_URL}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(comment_Data),
    })

    if (!response.ok) throw new Error(ErrCreateComment)
    
    return response.json()
};

export const deleteComment = async (id: string) => {
    const response = await fetch(`${BASE_URL}/comments/${id}`, {
        method: "DELETE",
    })

    if (!response.ok) throw new Error(ErrDeleteComment)

    return response.json()
}