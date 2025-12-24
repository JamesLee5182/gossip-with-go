import PostCard from "./PostCard";
import { useQuery } from "@tanstack/react-query";
import { getPostsByTopic } from "../api/posts";

type PostListProps = {
    topic_id: number
}

export default function PostList({topic_id} : PostListProps) {
    const {data: posts, isLoading, error} = useQuery({
        queryKey: ['posts', 'list', topic_id],
        queryFn: () => getPostsByTopic(topic_id)
    })

    if (error) return <div>Error Loading Posts</div>
    if (isLoading) return <div>Loading Posts</div>
    if (posts == null || posts.length == 0) return <div>No Posts yet.</div>

    return (
        <div>
            {posts?.map((post) => (
                <div key={post.id}>
                    <PostCard id={post.id} title={post.title} content={post.content} username={post.username} created_at={post.created_at} edited_at={post.edited_at}/>
                </div>
            ))}
        </div>
    );
}