import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import type { Post } from "../types/models"
import { Stack } from "@mui/material"
import CreateCommentForm from "../components/CreateCommentForm"
import CommentList from "../components/CommentList"

// Shows Post and add comment button at the top and all comments below
export default function PostPage() {
    const { id } = useParams<{ id: string }>()

    const [post, setPost] = useState<Post>()

    // get post details
    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                try {
                    const response = await fetch(`http://localhost:8000/posts/${id}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    })

                    const data = await response.json()
                    setPost(data.payload.data)
                } catch (err) {
                    console.error(err)
                }
            }

            fetchData()
        }       
    }, [id])

    if (!post) {
        return <div>Loading Post</div>
    }
    
    return (
        <Stack>
            <CreateCommentForm user_id={1} post_id={post.id}/>
            <CommentList post_id={post.id}/>
        </Stack>
    )
}