import { Card } from "../shadcn-ui/card"
import { Skeleton } from "../shadcn-ui/skeleton"

export default function PostLoadingCard() {
    return (
        <Card>
            <div className="p-3 pb-0">
                <Skeleton className="w-full h-[120px] rounded-md" />
            </div>
            <div className="p-3 flex flex-col gap-2">
                <Skeleton className="w-full h-[70px] rounded-md" />
                <div className="flex gap-2">
                    {[1, 2, 3].map((num) => (
                        <Skeleton key={num} className="w-[60px] h-[22px] rounded-md" />
                    ))}
                </div>
                <Skeleton className="w-[85px] h-[17px] rounded-md" />
            </div>
            <div className="flex items-center gap-2 p-3 w-full">
                <Skeleton className="w-[43px] h-[32px] rounded-md" />
                <Skeleton className="w-[30px] h-[30px] rounded-md" />
                <Skeleton className="w-[30px] h-[30px] rounded-md" />
                <div className="flex-1">
                    <Skeleton className="w-[100px] h-[30px] rounded-md float-end" />
                </div>
            </div>
        </Card>
    )
}
