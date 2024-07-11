import { Bell } from "lucide-react";
import IconButton from "../IconButton";

export default function NotificationsCenterIcon() {
    return (
        <IconButton className="bg-muted hover:bg-primary-hover p-1.5 rounded-md cursor-pointer">
            <Bell size={22} strokeWidth={1.5} />
        </IconButton>
    )
}
