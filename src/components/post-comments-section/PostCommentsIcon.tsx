import { MessageSquareText } from 'lucide-react'
import convertToArabic from '@/lib/convertToArabic'
import PostCardIconButton from '../post-card/PostCardIconButton'
import { Dispatch, MouseEvent, SetStateAction } from 'react'

type PostCommentsIconProps = {
    commentsCount: number;
    scrollToCommentsSectionState: [boolean, Dispatch<SetStateAction<boolean>>]
}

export default function PostCommentsIcon({ commentsCount, scrollToCommentsSectionState }: PostCommentsIconProps) {

    const [scrollToCommentsSection, setScrollToCommentsSection] = scrollToCommentsSectionState

    function handleClick(_e: MouseEvent<HTMLButtonElement>) {
        !scrollToCommentsSection && setScrollToCommentsSection(true)
    }

    return (
        <PostCardIconButton
            tooltipContent="التعليقات"
            className='hover:!bg-blue-600/30'
            onClick={handleClick}
            dontStopPropagation
        >
            <MessageSquareText size={20} />
            {convertToArabic(commentsCount)}
        </PostCardIconButton>
    )
}
