import { Card, CardContent, Typography, Stack, Button } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import { formatTime } from '../utils/formatDate';
import { deleteComment } from "../api/comments";
import { useAuth } from "../context/AuthContext";
import { canDelete } from "../utils/userUtils";
import DeleteButton from "./DeleteButton";

type CommentProps = {
    post_id: number
    id: number
    user_id: number
    content: string;
    username: string;
    created_at: string;
    edited_at: string
};

export default function CommentCard({post_id, id, user_id, content, username, created_at, edited_at}: CommentProps) {
    const { user } = useAuth()

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

                {canDelete(user, { user_id }) && 
                    <DeleteButton 
                        item_id={`${id}`} 
                        deleteFn={deleteComment} 
                        queryKey={['comments', 'list', `${id}`]}                        
                    />
                }

            </CardContent>
        </Card>
    )
}