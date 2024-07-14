import SidebarItem from "./SidebarItem"
import { sidebarItems } from "./sidebarItemsData"

export default function Sidebar() {
    return (
        <div className="min-w-fit sm:min-w-[250px] h-[calc(100vh - 57px)] border-e pt-3 md:pt-4">
            <ul className="space-y-2">
                {sidebarItems.map((item) => <SidebarItem key={item.link} item={item} />)}
            </ul>
        </div>
    )
}
