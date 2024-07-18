import Logo from "./Logo";
import SearchField from "./SearchField";
import NotificationsCenterIcon from "./NotificationsCenterIcon";
import UserAccount from "../UserAccount";

export default function Header() {
    return (
        <div className="flex items-center justify-between w-full border-b py-2 px-4 gap-2">
            <Logo />
            <SearchField />
            <NotificationsCenterIcon />
            <UserAccount />
        </div>
    )
}
