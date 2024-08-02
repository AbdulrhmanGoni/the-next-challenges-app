"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Tooltip from '../Tooltip'
import { SidebarItemType } from './SidebarItemsList';

export default function SidebarItem({ item }: { item: SidebarItemType }) {

    const path = usePathname();
    const itemBg = path === item.link ? "bg-primary" : "bg-transparent";
    const itemBgOnHover = path === item.link ? "" : "hover:bg-primary-hover";
    const linkStyles = `flex items-center gap-3 text-sm sm:py-2 sm:px-3 ${itemBg} ${itemBgOnHover} transition-colors`

    return (
        <li>
            <Link
                href={item.link}
                className={`text-sm gap-2 flex-1 ${linkStyles}`}
            >
                <Tooltip
                    triggerProps={{
                        className: 'sm:hidden',
                        asChild: true,
                    }}
                    tooltipContent={item.title}
                    contentProps={{ side: "left" }}
                >
                    <span className='w-full h-full py-2 px-3'>
                        <item.Icon size={19} />
                    </span>
                </Tooltip>
                <item.Icon className='hidden sm:inline' size={19} />
                <p className='hidden sm:inline-block'>{item.title}</p>
            </Link>
        </li>
    )
}
