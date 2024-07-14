"use client"
import {
    BookMarkedIcon,
    HomeIcon,
    LucideIcon,
    SquarePlusIcon,
    TelescopeIcon
} from "lucide-react"
import SidebarItem from "./SidebarItem";

export type SidebarItemType = {
    title: string;
    link: string;
    Icon: LucideIcon;
}

const sidebarItems: SidebarItemType[] = [
    {
        title: "الصفحة الرئيسية",
        link: "/",
        Icon: HomeIcon
    },
    {
        title: "استكشف",
        link: "/discover-posts",
        Icon: TelescopeIcon
    },
    {
        title: "منشور جديد",
        link: "/publish-post",
        Icon: SquarePlusIcon
    },
    {
        title: "المنشورات المحفوظة",
        link: "/user-bookmarks",
        Icon: BookMarkedIcon
    },
]

export default function SidebarItemsList() {
    return (
        <ul className="space-y-2">
            {sidebarItems.map((item) => <SidebarItem key={item.link} item={item} />)}
        </ul>
    )
}
