"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Tooltip from '../Tooltip'
import { SidebarItemType } from './SidebarItemsList';

export default function SidebarItem({ item }: { item: SidebarItemType }) {

    const path = usePathname();
    const itemBg = path === item.link ? "bg-primary" : "bg-transparent";
    const itemBgOnHover = path === item.link ? "" : "hover:bg-primary-hover";
    const linkStyles = `flex items-center gap-3 text-sm py-2 px-3 ${itemBg} ${itemBgOnHover} transition-colors`

    return (
        <li>
            <Tooltip
                triggerProps={{
                    className: 'block sm:hidden ' + linkStyles,
                }}
                tooltipContent={item.title}
                contentProps={{ side: "left" }}
            >
                <item.Icon size={19} />
            </Tooltip>
            <Link
                href={item.link}
                className={`hidden sm:flex text-sm gap-2 flex-1 ${linkStyles}`}
            >
                <item.Icon size={19} />
                <p>{item.title}</p>
            </Link>
        </li>
    )
}
