import { useState, useEffect } from "react"
import type { Comment } from "../types/models"
import CommentCard from "./CommentCard"

type CommentListProps = {
    post_id: number
}

export default function CommentList({post_id}: CommentListProps) {
    const [comments, setComments] = useState<Comment[]>([])

    useEffect(() => {
        const fetchData = async ()=> {
            try {
                const response = await fetch(`http://localhost:8000/posts/${post_id}/comments`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })

                const data = await response.json()
                setComments(data.payload.data)
            } catch (err) {
                console.error(err)
            }
        }

        fetchData()
    }, [])

    if (comments.length == 0) {
        return <div>No Comments yet</div>
    }

    return (
        <div>
            {comments?.map((comment) => (
                <div key={comment.id}>
                    <CommentCard id = {comment.id} content = {comment.content} user_id = {comment.user_id} post_id = {comment.post_id} created_at={comment.created_at} edited_at={comment.edited_at}/>
                </div>
            ))}
        </div>
    )
}