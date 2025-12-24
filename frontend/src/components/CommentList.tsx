import CommentCard from "./CommentCard"
import { useQuery } from "@tanstack/react-query"
import { getCommentsByPost } from "../api/comments"

type CommentListProps = {
    post_id: number
}

export default function CommentList({post_id}: CommentListProps) {
    const { data: comments, isLoading, error } = useQuery({
        queryKey: ['comments', 'list', post_id],
        queryFn: () => getCommentsByPost(post_id),
        enabled: !!post_id,
    })

    if (error) return <div>Error Loading Comments</div>
    if (isLoading) return <div>Loading Comments</div>
    if (comments == null || comments.length == 0) return <div>No Comments yet.</div>

    return (
        <div>
            {comments?.map((comment) => (
                <div key={comment.id}>
                    <CommentCard id = {comment.id} content = {comment.content} username = {comment.username} created_at={comment.created_at} edited_at={comment.edited_at}/>
                </div>
            ))}
        </div>
    )
}