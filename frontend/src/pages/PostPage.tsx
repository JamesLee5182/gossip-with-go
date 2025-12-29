import { useParams } from "react-router-dom"
import { Card, CardContent, Stack, Typography, Button } from "@mui/material"
import CreateCommentForm from "../components/CreateCommentForm"
import CommentList from "../components/CommentList"
import { useQuery } from '@tanstack/react-query';
import { deletePost, getPost } from '../api/posts';
import { useAuth } from '../context/AuthContext';
import { canDelete } from "../utils/userUtils";
import DeleteButton from "../components/DeleteButton";

export default function PostPage() {
    const { id } = useParams<{ id: string }>()

    const { user } = useAuth()

    const { data: post, isLoading, error } = useQuery({
        queryKey: ['posts', 'detail', id],
        queryFn: () => getPost(id || ""),
        enabled: !!id,
    })

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

            {canDelete(user, post) && 
                <DeleteButton 
                    item_id={id} 
                    deleteFn={deletePost} 
                    navigateAfterDelete={`/topic/${post?.topic_id}`}
                    queryKey={['posts', 'list', `${id}`]}
                />
            }

            <CreateCommentForm post_id={post.id}/>
                        
            <CommentList post_id={post.id}/>
        </Stack>
    )
}