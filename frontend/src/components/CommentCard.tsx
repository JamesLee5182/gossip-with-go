import { Card, CardContent, Typography, Stack, CardActions, Button, Chip } from "@mui/material"
import { Link } from "react-router-dom"
import { formatTime } from '../utils/formatDate';

type CommentProps = {
    id: number
    content: string;
    username: string;
    created_at: string;
    edited_at: string
};

export default function CommentCard({id, content, username, created_at, edited_at}: CommentProps) {
    return (
        <Card sx={{ minWidth: 275, mb: 2 }}>
            <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="h5" component="div">
                        {content}
                    </Typography>
                    <Stack direction="column">
                        <Chip label={`${formatTime(created_at)}`} color="primary" size="small" />
                        <Chip label={`From: ${username}`} color="primary" size="small" />
                    </Stack>
                </Stack>
            </CardContent>

            <CardActions>
                <Button size="small" component={Link} to={`/post/${id}`}>View Post</Button>
            </CardActions>
        </Card>
    )
}