"use client"
import { EllipsisVerticalIcon, FlagIcon, Trash2Icon } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/shadcn-ui/dropdown-menu"
import useUserData from "@/hooks/useUserData";
import useRemovePostComment from "@/hooks/useRemovePostComment";
import LoadingSpinner from "../LoadingSpinner";

export default function PostCommentCardOptions({ comment }: { comment: PostComment }) {

    const { userData } = useUserData();
    const { removePostComment, isLoading } = useRemovePostComment()

    return (
        <DropdownMenu dir="rtl">
            <DropdownMenuTrigger className="float-left">
                <EllipsisVerticalIcon size={19} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {
                    userData?.id === comment.commenterId &&
                    <DropdownMenuItem
                        className="gap-2"
                        onClick={() => removePostComment(comment.id)}
                        disabled={isLoading}
                    >
                        {
                            isLoading ? <LoadingSpinner className="h-[18px] w-[18px] border-2" />
                                : <Trash2Icon size={19} />
                        }
                        حذف
                    </DropdownMenuItem>
                }
                <DropdownMenuItem className="gap-2">
                    {<FlagIcon size={19} />} إبلاغ
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
