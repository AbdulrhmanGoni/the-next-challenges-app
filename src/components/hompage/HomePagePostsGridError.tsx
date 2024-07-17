"use client"
import { AlertOctagonIcon } from "lucide-react";
import PageMessage from "../PageMessage";

export default function HomePagePostsGridError() {

    return (
        <div className="w-full">
            <PageMessage
                action={() => { location.reload() }}
                actionMessage="إعادة المحاولة"
                message="فشل جلب المنشورات"
                descreption="خطأ غير متوقع اثناء محاولة جلب المنشورات المخصصة لك"
                Icon={AlertOctagonIcon}
            />
        </div>
    )
}