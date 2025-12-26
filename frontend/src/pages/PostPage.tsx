import { useParams } from "react-router-dom"
import {Card, CardContent, Stack, Typography} from "@mui/material"
import CreateCommentForm from "../components/CreateCommentForm"
import CommentList from "../components/CommentList"
import { useQuery } from '@tanstack/react-query';
import { getPost } from '../api/posts';
import PostCard from "../components/PostCard";

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
            <Typography variant="h3">
                {post.topic_name}
            </Typography>

            <Card sx={{ minWidth: 275, mb: 2 }} variant="outlined">
                <CardContent>

                    <Typography sx={{mb:2}} variant="h4">
                        {post.title}
                    </Typography>

                    <Typography variant="body1">
                        {post.content}
                    </Typography>

                </CardContent>
            </Card>

            <CreateCommentForm post_id={post.id}/>
                        
            <CommentList post_id={post.id}/>
        </Stack>
    )
}