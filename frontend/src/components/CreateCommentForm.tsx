import { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Stack, TextField, Typography, Button } from "@mui/material";
import { createComment } from "../api/comments";

type CreateCommentProps = {
    post_id: number,
}

export default function CreateCommentForm({ post_id}: CreateCommentProps) {
    const [content, setContent] = useState<string>()
    
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: (new_Data: { content: string; user_id: number; post_id: number}) => 
            createComment(new_Data),
        
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['comments', 'list', post_id] });

            setContent("");

            alert("Comment created");
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        if (!content) return;
        e.preventDefault();
        mutation.mutate({ content: content, user_id: 1, post_id: post_id });
    };

    return (
        <Stack spacing={2}>
            <Typography>Create New Comment</Typography>

            <TextField 
                label="Content" 
                variant="standard" 
                onChange={(e) => setContent(e.target.value)}
                value={content}
            />

            <Button 
                variant="outlined" 
                onClick={handleSubmit}
                disabled={mutation.isPending}
            >
                Submit
            </Button>
        </Stack>
    )
}