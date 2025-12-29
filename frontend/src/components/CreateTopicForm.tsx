import { useState } from "react"
import {Card, CardContent, CardActions, TextField, Typography} from "@mui/material"
import { Button } from "@mui/material"
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTopic } from '../api/topics';
import { useAuth } from '../context/AuthContext';

export default function CreateTopicForm() {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const { user } = useAuth()
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: (new_Data: { title: string; description: string, user_id: number}) => 
            createTopic(new_Data),
        
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['topics', 'list', 0] })

            setTitle("")
            setDescription("")

            alert("Topic created")
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        if (!user) return

        if (!title.trim() || !description.trim()) return
        e.preventDefault()
        mutation.mutate({ title: title, description: description, user_id: user.id })
    };

    if (!user) {
        return <Typography>Login to create topics</Typography>;
    }

    return (
        <Card sx={{ minWidth: 275, mb: 2 }} variant="outlined">
            <form onSubmit={handleSubmit}>
                <CardContent>
                    <Typography variant="body1">
                        Create New Topic
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
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
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