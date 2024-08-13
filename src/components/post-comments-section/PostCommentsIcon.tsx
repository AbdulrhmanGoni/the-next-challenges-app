import { MessageSquareText } from 'lucide-react'
import convertToArabic from '@/lib/convertToArabic'
import PostCardIconButton from '../post-card/PostCardIconButton'
import { MouseEvent } from 'react'

type PostCommentsIconProps = {
    commentsCount: number;
    openPostFullCard(scrollToCommentsSection?: boolean): void
}

export default function PostCommentsIcon({ commentsCount, openPostFullCard }: PostCommentsIconProps) {

    function handleClick(_e: MouseEvent<HTMLButtonElement>) {
        openPostFullCard(true)
    }

    return (
        <PostCardIconButton
            tooltipContent="التعليقات"
            className='hover:!bg-blue-600/30'
            onClick={handleClick}
        >
            <MessageSquareText size={20} />
            {convertToArabic(commentsCount)}
        </PostCardIconButton>
    )
}
