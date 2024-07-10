"use client"
import useUserData from "@/hooks/useUserData";
import Avatar from "./Avatar";
import { LogInIcon } from "lucide-react";
import IconButton from "./IconButton";
import Link from "next/link";

export default function UserAvatar() {

    const { userData } = useUserData();

    return (
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

