import { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Card, Stack, TextField, Typography, Button, CardContent, CardActions, CardHeader } from "@mui/material";
import { createComment } from "../api/comments";
import { useAuth } from "../context/AuthContext";

type CreateCommentProps = {
    post_id: number,
}

export default function CreateCommentForm({ post_id}: CreateCommentProps) {
    const [content, setContent] = useState("")
    
    const { user } = useAuth()

    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: (new_Data: { content: string; user_id: number; post_id: number}) => 
            createComment(new_Data),
        
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['comments', 'list', post_id] })

            setContent("")

            alert("Comment created")
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        if (!user) return

        if (!content.trim()) return
        e.preventDefault()
        mutation.mutate({ content: content, user_id: user.id, post_id: post_id })
    };

    if (!user) {
        return <Typography>Login to write comments</Typography>
    }

    return (
        <Card sx={{ minWidth: 275, mb: 2 }} variant="outlined">
            <form onSubmit={handleSubmit}>
                <CardContent>
                    <TextField 
                        fullWidth
                        label="Create New Comment" 
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