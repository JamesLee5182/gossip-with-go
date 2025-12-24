import { useState } from "react"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import { Button } from "@mui/material"
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost } from '../api/posts';

type CreatePostProps = {
    topic_id: number
}

export default function CreatePostForm({ topic_id }: CreatePostProps) {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (new_Data: { title: string; content: string; user_id: number; topic_id: number}) => 
            createPost(new_Data),
        
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts', 'detail', topic_id] });

            setTitle("");
            setContent("");

            alert("Post created");
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        if (!title || !content) return;
        e.preventDefault();
        mutation.mutate({ title: title, content: content, user_id: 1, topic_id: topic_id });
    };

    return (
        <Stack spacing={2}>
            <Typography>Create New Post</Typography>

            <TextField 
                label="Title" 
                variant="standard" 
                onChange={(e) => setTitle(e.target.value)} 
                value={title}
                disabled={mutation.isPending}
            />

            <TextField 
                label="Content" 
                variant="standard" 
                onChange={(e) => setContent(e.target.value)} 
                value={content}
                disabled={mutation.isPending}    
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