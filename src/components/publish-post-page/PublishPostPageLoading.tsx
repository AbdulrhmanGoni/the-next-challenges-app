import { Skeleton } from "../shadcn-ui/skeleton";

export default function PublishPostPageLoading() {
    return (
        <div className="max-w-[700px] w-full space-y-8">
            <div className="flex justify-center">
                <Skeleton className="w-72 h-8" />
            </div>

            <div className="space-y-2">
                <LableLoading />
                <Skeleton className="w-full h-10" />
                <Skeleton className="w-96 h-5" />
            </div>

            <div className="space-y-2">
                <LableLoading />
                <Skeleton className="w-80 h-52" />
                <Skeleton className="w-96 h-5" />
            </div>

            <div className="space-y-2">
                <LableLoading />
                <Skeleton className="w-full h-20" />
                <Skeleton className="w-96 h-5" />
            </div>

            <div className="space-y-2">
                <LableLoading />
                <Skeleton className="w-full h-10" />
                <Skeleton className="w-96 h-5" />
            </div>

            <div className="space-y-2">
                <LableLoading />
                <Skeleton className="w-96 h-5 mb-2" />
                <Skeleton className="w-32 h-10" />
            </div>

            <div className="space-y-2">
                <LableLoading />
                <Skeleton className="w-96 h-5 mb-2" />
                <div className="flex gap-2">
                    <Skeleton className="w-full h-10" />
                    <Skeleton className="w-full h-10" />
                </div>
                <Skeleton className="w-full h-10" />
                <Skeleton className="w-32 h-10" />
            </div>
        </div>
    )
}

function LableLoading() {
    return (
        <div className="flex gap-2">
            <Skeleton className="w-7 h-7" />
            <Skeleton className="w-28 h-7" />
        </div>
    )
}
