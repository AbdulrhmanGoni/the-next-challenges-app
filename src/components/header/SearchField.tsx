import { Search } from "lucide-react"
import { Input } from "../shadcn-ui/input"

export default function SearchField() {
    return (
        <div className="relative w-full sm:max-w-[445px] mx-auto">
            <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
            <Input
                type="search"
                placeholder="بحث..."
                className="w-full rounded-lg bg-background pl-8"
            />
        </div>
    )
}
