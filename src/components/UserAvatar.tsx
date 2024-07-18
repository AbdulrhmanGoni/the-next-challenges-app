"use client"
import useUserData from "@/hooks/useUserData";
import Avatar from "./Avatar";
import { Skeleton } from "./shadcn-ui/skeleton";

export default function UserAvatar() {

    const { userData, isLoading } = useUserData();

    return (
        isLoading ? <Skeleton className="w-10 h-10 rounded-full" /> :
            userData &&
            <Avatar
                src={userData?.avatar}
                fallback={(userData?.firstName[0] + userData?.lastName[0]).toUpperCase()}
            />
    )
}

