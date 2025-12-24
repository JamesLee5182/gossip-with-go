import { useParams } from "react-router-dom"
import { Stack } from "@mui/material"
import CreateCommentForm from "../components/CreateCommentForm"
import CommentList from "../components/CommentList"
import { useQuery } from '@tanstack/react-query';
import { getPost } from '../api/posts';

// Shows Post and add comment button at the top and all comments below
export default function PostPage() {
    const { id } = useParams<{ id: string }>()

    const { data: post, isLoading, error } = useQuery({
        queryKey: ['posts', 'detail', id],
        queryFn: () => getPost(id || ""),
        enabled: !!id,
    });

    if (error) return <div>Error Loading Post</div>
    if (isLoading) return <div>Loading Post</div>
    if (!post) return <div>Post not found.</div>

    return (
        <Stack>
            <CreateCommentForm post_id={post.id}/>
            <CommentList post_id={post.id}/>
        </Stack>
    )
}