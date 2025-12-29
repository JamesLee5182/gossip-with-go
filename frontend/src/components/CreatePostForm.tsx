import { useState } from "react"
import { Typography, Card, CardContent, CardActions, TextField} from "@mui/material"
import { Button } from "@mui/material"
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost } from '../api/posts';
import { useAuth } from "../context/AuthContext";

type CreatePostProps = {
    topic_id: number
}

export default function CreatePostForm({ topic_id }: CreatePostProps) {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    const { user } = useAuth()

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (new_Data: { title: string; content: string; user_id: number; topic_id: number}) => 
            createPost(new_Data),
        
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts', 'list', topic_id] });

            setTitle("");
            setContent("");

            alert("Post created");
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        if (!user) return

        if (!title.trim() || !content.trim()) return
        e.preventDefault()
        mutation.mutate({ title: title, content: content, user_id: user.id, topic_id: topic_id })
    };

    if (!user) {
        return <Typography>Login to create posts</Typography>
    }

    return (
        <Card sx={{ minWidth: 275, mb: 2 }} variant="outlined">
            <form onSubmit={handleSubmit}>
                <CardContent>
                    <Typography variant="body1">
                        Create New Post
                    </Typography>

                    <TextField 
                        fullWidth
                        label="Title" 
                        variant="standard" 
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />

                    <TextField 
                        fullWidth
                        label="Description" 
                        variant="standard" 
                        onChange={(e) => setContent(e.target.value)}
                        value={content}
                    />
                </CardContent>

                <CardActions>
                    <Button 
                        variant="outlined" 
                        onClick={handleSubmit}
                        disabled={mutation.isPending}
                    >
                        Submit
                    </Button>
                </CardActions>
            </form>
        </Card>
    )
}