"use client"
import { ArrowBigDownIcon, ArrowBigUpIcon } from 'lucide-react'
import convertToArabic from '@/lib/convertToArabic'
import PostCardIconButton from './PostCardIconButton'
import useVotePost from '@/hooks/useVotePost'

const upvotedClasses = "bg-green-500 hover:!bg-green-500"
const downvotedClasses = "bg-red-800 hover:!bg-red-800"

export default function PostVotes({ post, containerClassName }: { post: Post, containerClassName?: string }) {

    const {
        upvotePost,
        downvotePost,
        currentUserVote,
        avarageVotes,
        userIsLogged
    } = useVotePost({ post });

    const cursor = userIsLogged ? "" : "!cursor-not-allowed"
    const tooltipMessage = (msg: string) => userIsLogged ? msg : "سجل دخولك لتستطيع التسويط"

    return (
        <div className={`flex items-center justify-end gap-2 ${containerClassName}`}>
            <PostCardIconButton
                tooltipContent={tooltipMessage('صوت مؤيد')}
                className={`hover:bg-green-500/30 ${currentUserVote === "upvote" ? upvotedClasses : ""} ${cursor}`}
                onClick={upvotePost}
                disabled={!userIsLogged}
            >
                <ArrowBigUpIcon size={22} />
            </PostCardIconButton>
            {convertToArabic(avarageVotes)}
            <PostCardIconButton
                tooltipContent={tooltipMessage('صوت معارض')}
                className={`hover:bg-red-800/30 ${currentUserVote === "downvote" ? downvotedClasses : ""} ${cursor}`}
                onClick={downvotePost}
                disabled={!userIsLogged}
            >
                <ArrowBigDownIcon size={22} />
            </PostCardIconButton>
        </div >
    )
}


