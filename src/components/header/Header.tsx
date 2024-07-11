import Logo from "./Logo";
import SearchField from "./SearchField";
import UserAvatar from "../UserAvatar";
import NotificationsCenterIcon from "./NotificationsCenterIcon";

export default function Header() {
    return (
        <div className="flex items-center justify-between w-full border-b py-2 px-4 gap-2">
            <Logo />
            <SearchField />
            <NotificationsCenterIcon />
            <UserAvatar />
        </div>
    )
}
