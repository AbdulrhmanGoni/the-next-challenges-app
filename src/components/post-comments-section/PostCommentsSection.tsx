import PostCommentsDisplayer from "./PostCommentsDisplayer"
import PostCommentsForm from "./PostCommentsForm"
import PostCommentsProvider from "@/contexts/PostCommentsProvider"

export default function PostCommentsSection({
    postId, postCommentsCount
}: PropsWithPostId<{ postCommentsCount: number }>) {

    return (
        <PostCommentsProvider postId={postId} postCommentsCount={postCommentsCount}>
            <div className="flex flex-col gap-3">
                <PostCommentsForm postId={postId} />
                <PostCommentsDisplayer postCommentsCount={postCommentsCount} />
            </div>
        </PostCommentsProvider>
    )
}
