"use client"
import useUserData from "@/hooks/useUserData";
import { LogInIcon } from "lucide-react";
import IconButton from "./IconButton";
import Link from "next/link";
import { Skeleton } from "./shadcn-ui/skeleton";
import UserAccountMenu from "./UserAccountMenu";

export default function UserAccount() {

    const { userData, requestDone } = useUserData();

    return (
        userData ?
            <UserAccountMenu />
            : requestDone ? (
                <Link href="/log-in">
                    <IconButton className="bg-muted hover:bg-primary-hover p-1.5 rounded-md cursor-pointer">
                        تسجيل الدخول
                        <LogInIcon size={22} strokeWidth={1.5} />
                    </IconButton>
                </Link>
            ) : <Skeleton className="w-10 h-10 rounded-full" />
    )
}

