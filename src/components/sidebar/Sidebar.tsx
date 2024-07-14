import SidebarItemsList from "./SidebarItemsList"

export default function Sidebar() {
    return (
        <div className="min-w-fit sm:min-w-[250px] h-[calc(100vh - 57px)] border-e pt-3 md:pt-4">
            <SidebarItemsList />
        </div>
    )
}
