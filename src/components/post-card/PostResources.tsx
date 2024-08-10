"use client"
import { LinkIcon } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/shadcn-ui/dialog"
import PostResourcesList from './PostResourcesList'
import PostCardIconButton from './PostCardIconButton'

export default function PostResources({ resources }: { resources: PostResource[] }) {

    return (
        <Dialog>
            <PostCardIconButton tooltipContent="مصادر" className='hover:bg-yellow-300/30'>
                <DialogTrigger asChild>
                    <LinkIcon size={19} />
                </DialogTrigger>
            </PostCardIconButton>
            <DialogContent onClick={(e) => { e.stopPropagation() }}>
                <DialogHeader>
                    <DialogTitle>المصادر</DialogTitle>
                    <DialogDescription>
                        المصادر المرفقة مع المنشور للتعلم اكثر عن الموضوع الخاص بالمشور
                    </DialogDescription>
                </DialogHeader>
                <PostResourcesList resources={resources} />
            </DialogContent>
        </Dialog>
    )
}
