"use client"
import { BookmarkIcon } from "lucide-react";
import PostCardIconButton from "./PostCardIconButton";
import usePostBookmark from "@/hooks/usePostBookmark";
import useUserData from "@/hooks/useUserData";

type PostBookmarkIconProps = {
    postId: Post["id"];
    containerClassName?: string;
}

const bookmarkedClasses = "fill-purple-600 stroke-purple-600"

export default function PostBookmark({ postId, containerClassName }: PostBookmarkIconProps) {

    const {
        bookmarkPost,
        isPostBookmarked
    } = usePostBookmark({ postId })
    const { userData } = useUserData();

    const cursor = userData ? "" : "!cursor-not-allowed";
    const tooltipMessage = (msg: string) => userData ? msg : "سجل دخولك لتستطيع حفظ المنشورات";

    return (
        <PostCardIconButton
            tooltipContent={tooltipMessage("حفظ")}
            onClick={bookmarkPost}
            className={`hover:bg-purple-600/30 ${containerClassName} ${cursor}`}
            disabled={!userData}
        >
            <BookmarkIcon
                className={isPostBookmarked ? bookmarkedClasses : ""}
                size={20}
            />
        </PostCardIconButton>
    )
}
