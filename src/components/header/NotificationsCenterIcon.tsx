import { Bell } from "lucide-react";
import { Button } from "../shadcn-ui/button";

export default function NotificationsCenterIcon() {
    return (
        <Button size="icon" className="bg-muted hover:bg-primary-hover">
            <Bell size={22} strokeWidth={1.5} />
        </Button>
    )
}
