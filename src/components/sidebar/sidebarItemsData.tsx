import {
    BookMarkedIcon,
    HomeIcon,
    LucideIcon,
    SquarePlusIcon,
    TelescopeIcon
} from "lucide-react"

export type SidebarItemType = {
    title: string;
    link: string;
    Icon: LucideIcon;
}

export const sidebarItems: SidebarItemType[] = [
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
