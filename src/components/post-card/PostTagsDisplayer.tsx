"use client"
import { useEffect, useState } from 'react'
import { Badge } from '../shadcn-ui/badge'

const tagsPadding = 20
const gapAmongTags = 8
const postTagsContainerId = "post-tags-container"

type PostTagsDisplayerPropd = {
    tags: string[];
    displayAllTags?: boolean
}

export default function PostTagsDisplayer({ tags, displayAllTags }: PostTagsDisplayerPropd) {

    const [choosenTagsToDisplay, setTagsToDisplay] = useState(0);
    const [isFirstRender, setIsFirstRender] = useState(true);

    function chooseTagsToDisplay(tags: string[], tagsGroupMaxLength: number) {
        let totalTagsWidth = 0;
        let choosenTags = 0;
        for (let i = 0; i < tags.length; i++) {
            const tag = tags[i];
            const tagLength = (("#" + tag).length * 5.5) + tagsPadding;
            totalTagsWidth += choosenTags > 1 ? gapAmongTags : 0
            if (tagsGroupMaxLength < totalTagsWidth + tagLength + 30) {
                break;
            }
            choosenTags++
            totalTagsWidth += tagLength
        }

        return choosenTags
    }

    useEffect(() => {
        if (!displayAllTags) {
            const postTagsContainer = document.getElementById(postTagsContainerId) as HTMLElement;
            const choosenTags = chooseTagsToDisplay(tags, postTagsContainer.clientWidth - 10);
            setTagsToDisplay(choosenTags)
        }

        setIsFirstRender(false)
    }, [])

    return (
        <div id={postTagsContainerId} className='flex items-center gap-2 flex-wrap min-h-6'>
            {(displayAllTags ? tags : tags.slice(0, choosenTagsToDisplay)).map((tag) => (
                <Badge
                    key={tag}
                    dir='ltr'
                    className='bg-muted'
                >
                    #{tag}
                </Badge>
            ))}
            {
                !isFirstRender &&
                !displayAllTags &&
                tags.length > choosenTagsToDisplay &&
                <span className='text-muted-foreground'>
                    {"+" + (tags.length - choosenTagsToDisplay)}
                </span>
            }
        </div>
    )
}
