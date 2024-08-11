import timeAgo from "@/lib/timeAgo"
import Avatar from "../Avatar"
import PostCommentCardOptions from "./PostCommentCardOptions";

type PostCommentCard = {
    comment: PostComment;
}

export default function PostCommentCard({ comment }: PostCommentCard) {
    return (
        <div className="rounded-sm bg-card-hover p-3">
            <div className="flex gap-2 items-center">
                <Avatar src={comment.owner.avatar?.src} />
                <div>
                    <p className="text-md">{comment.owner.firstName}</p>
                    <p className="text-muted-foreground">{comment.owner.headline}</p>
                </div>
                <div className="flex flex-col flex-1 items-end justify-center gap-2">
                    <PostCommentCardOptions comment={comment} />
                    <p className="text-ms text-muted-foreground">
                        {timeAgo(comment.createdAt || new Date())}
                    </p>
                </div>
            </div>
            <p className="mt-4">{comment.comment}</p>
        </div>
    )
}
