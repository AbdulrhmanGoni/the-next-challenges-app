"use client"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../shadcn-ui/card"
import PostBookmark from "./PostBookmark"
import PostVotes from "./PostVotes"
import PostTagsDisplayer from "./PostTagsDisplayer"
import PostPublishDate from "./PostPublishDate"
import PostResources from "./PostResources"
import PostCommentsIcon from "../post-comments-section/PostCommentsIcon"
import PostCategoryMark from "./PostCategoryMark"
import usePostFullCardDialog from "@/hooks/usePostFullCardDialog"

interface PostCardProps {
    post: Post
}

export default function PostCard({ post }: PostCardProps) {

    const { open } = usePostFullCardDialog();

    function openPostFullCard(scrollToCommentsSection?: boolean) {
        open(post, scrollToCommentsSection)
    }

    return (
        <Card
            className="flex group flex-col transition hover:bg-card-hover cursor-pointer hover:scale-[1.02]"
            onClick={() => { openPostFullCard() }}
        >
            <CardHeader className="p-3 pb-0">
                <Image
                    alt={post.title}
                    src={post.thumbnail.src}
                    width={200}
                    height={120}
                    className="w-full md:h-40"
                />
            </CardHeader>
            <CardContent className="p-3 pb-0 flex flex-col gap-2 flex-1">
                <CardTitle className="text-xl flex-1">{post.title}</CardTitle>
                <PostTagsDisplayer tags={post.tags} />
                <PostPublishDate publishDate={post.publishedAt} />
            </CardContent>
            <PostCategoryMark category={post.category} />
            <CardFooter className="gap-2 p-3">
                <PostCommentsIcon
                    commentsCount={post.commentsCount}
                    openPostFullCard={openPostFullCard}
                />
                <PostBookmark postId={post.id} />
                <PostResources resources={post.resources} />
                <PostVotes
                    post={post}
                    containerClassName="flex-1"
                />
            </CardFooter>
        </Card>
    )
}
