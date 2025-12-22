import { useState } from "react";
import { Stack, TextField, Typography, Button } from "@mui/material";

type CreateCommentProps = {
    user_id: number,
    post_id: number,
}

export default function CreateCommentForm({user_id, post_id}: CreateCommentProps) {
    const [content, setContent] = useState<string>()
    
    const handleSubmit = async () => {
        try {
            await fetch("http://localhost:8000/comments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    content: content,
                    user_id: user_id,
                    post_id: post_id,
                }),
            })
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <Stack spacing={2}>
            <Typography>Create New Comment</Typography>

            <TextField label="Content" variant="standard" onChange={(e) => setContent(e.target.value)}/>

            <Button variant="outlined" onClick={handleSubmit}>Submit</Button>
        </Stack>
    )
}