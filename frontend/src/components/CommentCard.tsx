import { Card, CardContent, Typography, Stack, CardActions, Button, Chip } from "@mui/material"
import { Link } from "react-router-dom"

type CommentProps = {
    id: number
    content: string;
    user_id: number;
    post_id: number;
    created_at: string;
    edited_at: string
};

export default function CommentCard({id, content, user_id, post_id, created_at, edited_at}: CommentProps) {
    return (
        <Card sx={{ minWidth: 275, mb: 2 }}>
            <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="h5" component="div">
                        {content}
                    </Typography>
                    <Stack direction="column">
                        <Chip label={`${created_at}`} color="primary" size="small" />
                        <Chip label={`From: ${user_id}`} color="primary" size="small" />
                    </Stack>
                </Stack>
            </CardContent>

            <CardActions>
                <Button size="small" component={Link} to={`/post/${id}`}>View Post</Button>
            </CardActions>
        </Card>
    )
}