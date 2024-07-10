import Avatar from "../Avatar";

export default function Logo() {
    return (
        <div className="flex items-center gap-2">
            <Avatar
                containerClassName="h-9 w-9"
                src="/logo.svg"
                fallback="NC"
            />
            <h1 style={{ lineHeight: 1.1 }} className="hidden sm:block">
                التحديات التالية
            </h1>
        </div>
    )
}

