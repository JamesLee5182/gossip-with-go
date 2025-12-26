import { Card, CardContent, Typography, Stack} from "@mui/material"
import { Link } from "react-router-dom"
import { formatTime } from '../utils/formatDate';

type CommentProps = {
    content: string;
    username: string;
    created_at: string;
    edited_at: string
};

export default function CommentCard({content, username, created_at, edited_at}: CommentProps) {
    return (
        <Card sx={{ minWidth: 275, mb: 2 }}>
            <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="body1">
                        {content}
                    </Typography>
                    <Stack direction="column" alignItems="flex-end">
                        <Typography variant="body2">
                            {formatTime(created_at)}
                        </Typography>
                        <Typography variant="body2">
                            {`From: ${username}`}
                        </Typography>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    )
}