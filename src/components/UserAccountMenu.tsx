import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/shadcn-ui/dropdown-menu"
import Avatar from "./Avatar"
import { CircleUserIcon, LogOutIcon } from "lucide-react"
import useUserData from "@/hooks/useUserData";
import { useCookies } from "next-client-cookies";
import accessTokenCookieName from "@/constants/accessTokenCookieName";

export default function UserAccountMenu() {

    const { userData } = useUserData();
    const user = userData as User
    const { remove } = useCookies();

    function logOut() {
        remove(accessTokenCookieName);
        location.reload();
    }

    return (
        <DropdownMenu dir="rtl">
            <DropdownMenuTrigger className="focus-visible:outline-0 ">
                <Avatar
                    src={user?.avatar?.src}
                    fallback={(user?.firstName[0] + user?.lastName[0]).toUpperCase()}
                />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>
                    {user.firstName}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    {<CircleUserIcon size={18} />}
                    حسابي
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logOut}>
                    {<LogOutIcon size={18} />}
                    تسجيل الخروج
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
