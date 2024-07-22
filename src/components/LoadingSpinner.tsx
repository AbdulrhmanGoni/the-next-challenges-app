import { cn } from '@/lib/utils'

export default function LoadingSpinner({ className }: { className?: string }) {
    return (
        <span className={cn("border-muted h-10 w-10 animate-spin rounded-full border-4 border-t-primary", className)} />
    )
}
