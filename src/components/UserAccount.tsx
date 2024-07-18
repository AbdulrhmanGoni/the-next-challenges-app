"use client"
import useUserData from "@/hooks/useUserData";
import Avatar from "./Avatar";
import { LogInIcon } from "lucide-react";
import IconButton from "./IconButton";
import Link from "next/link";
import { Skeleton } from "./shadcn-ui/skeleton";

export default function UserAccount() {

    const { userData, isLoading } = useUserData();

    return (
        isLoading ? <Skeleton className="w-10 h-10 rounded-full" /> :
            userData ?
                <Avatar
                    src={userData?.avatar}
                    fallback={(userData?.firstName[0] + userData?.lastName[0]).toUpperCase()}
                /> :
                <Link href="/log-in">
                    <IconButton
                        className="bg-muted hover:bg-primary-hover p-1.5 rounded-md cursor-pointer"
                    >
                        تسجيل الدخول
                        <LogInIcon size={22} strokeWidth={1.5} />
                    </IconButton>
                </Link>
    )
}

