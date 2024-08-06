"use client"
import { AlertOctagonIcon } from "lucide-react";
import PageMessage from "../PageMessage";
import useUserData from "@/hooks/useUserData";

export default function HomePagePostsGridError() {

    const { userData } = useUserData()

    return (
        <div className="w-full h-full">
            <PageMessage
                action={() => { location.reload() }}
                actionMessage="إعادة المحاولة"
                message="فشل جلب المنشورات"
                descreption={`خطأ غير متوقع اثناء محاولة جلب المنشورات ${userData ? "المخصصة لك" : ""}`}
                Icon={AlertOctagonIcon}
            />
        </div>
    )
}