import { BookmarkIcon } from 'lucide-react'
import { useState } from 'react'

export default function PostCategoryMark({ category }: { category: string }) {

    const [categoryMarkWidth, setCategoryMarkWidth] = useState<string>();

    function getCategoryMarkWidth(e: HTMLSpanElement | null) {
        setCategoryMarkWidth(`-${e?.clientWidth! - 5}px`)
    }

    return (
        <div className="flex justify-end relative overflow-hidden">
            <span
                ref={getCategoryMarkWidth}
                style={{ left: categoryMarkWidth }}
                className={`text-end z-10 bg-primary px-2 py-1 relative transition-all group-hover:!left-0`}
            >
                <p className="text-sm">{category}</p>
                <BookmarkIcon
                    className="absolute -z-10 fill-primary stroke-primary -rotate-90 -right-4 top-1/2 -translate-y-1/2"
                    size={42}
                />
            </span>
        </div>
    )
}
