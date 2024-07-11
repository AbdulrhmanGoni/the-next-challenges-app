import { ReactNode } from "react"

interface IconButtonProps {
    children: ReactNode;
    color?: string
    className?: string
}

export const IconButtonClasses = 'flex gap-1.5 items-center p-1 transition-colors rounded-sm cursor-pointer '

export default function IconButton({ children, className }: IconButtonProps) {
    return (
        <button className={IconButtonClasses + className}>
            {children}
        </button>
    )
}
