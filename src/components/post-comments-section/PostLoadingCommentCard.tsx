import { Skeleton } from "../shadcn-ui/skeleton"

export default function PostLoadingCommentCard() {
    return (
        <div className="rounded-sm bg-card-hover p-3">
            <div className="flex gap-2 items-center">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div className="space-y-2 flex-1">
                    <Skeleton className="w-36 h-4" />
                    <Skeleton className="w-32 h-4" />
                </div>
                <Skeleton className="w-28 h-4" />
            </div>
            <Skeleton className="w-full h-16 mt-3" />
        </div>
    )
}
