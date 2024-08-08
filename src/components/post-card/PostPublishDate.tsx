import timeAgo from "@/lib/timeAgo";

type PostPublishDateProps = {
    publishDate: number;
    className?: string;
    displayFullDate?: boolean;
}

export default function PostPublishDate({ publishDate, className, displayFullDate }: PostPublishDateProps) {
    return (
        <p suppressHydrationWarning className={`text-sm text-[13px] text-muted-foreground ${className}`}>
            {timeAgo(publishDate)}
            {displayFullDate && "  -  " + new Date(publishDate).toDateString()}
        </p>
    )
}