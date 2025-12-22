import { useState, useEffect } from "react"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import { Button } from "@mui/material"

type CreatePostProps = {
    user_id: number
    topic_id: number
}

export default function CreatePostForm({user_id, topic_id}: CreatePostProps) {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    const handleSubmit = async () => {
        try {
            await fetch("http://localhost:8000/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    title: title,
                    content: content,
                    user_id: user_id,
                    topic_id: topic_id,
                }), 
            })
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <Stack spacing={2}>
            <Typography>Create New Post</Typography>

            <TextField label="Title" variant="standard" onChange={(e) => setTitle(e.target.value)}/>
            <TextField label="Content" variant="standard" onChange={(e) => setContent(e.target.value)}/>

            <Button variant="outlined" onClick={handleSubmit}>Submit</Button>
        </Stack>
    )
}