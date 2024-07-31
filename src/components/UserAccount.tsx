"use client"
import useUserData from "@/hooks/useUserData";
import { LogInIcon } from "lucide-react";
import { Skeleton } from "./shadcn-ui/skeleton";
import UserAccountMenu from "./UserAccountMenu";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Button } from "./shadcn-ui/button";

export default function UserAccount() {

    const { userData, requestDone } = useUserData();
    const { push } = useRouter();
    const isSmallScreen = useMediaQuery("(max-width: 640px)");

    return (
        userData ?
            <UserAccountMenu />
            : requestDone ? (
                <Button
                    className="bg-muted hover:bg-primary-hover text-nowrap gap-2"
                    size="default"
                    onClick={() => push("/log-in")}
                >
                    {"تسجيل الدخول"}
                    <LogInIcon size={22} strokeWidth={1.5} />
                </Button>
            ) : <Skeleton className="w-10 h-10 rounded-full" />
    )
}

