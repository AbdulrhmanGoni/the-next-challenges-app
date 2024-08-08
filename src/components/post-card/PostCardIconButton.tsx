"use client"
import { ReactNode } from 'react'
import Tooltip from '../Tooltip'
import { cn } from '@/lib/utils';

type PostCardIconButtonProps = {
    tooltipContent: string;
    disabled?: boolean;
    children: ReactNode;
    className?: string;
    dontStopPropagation?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const IconButtonClasses = 'flex gap-1.5 items-center p-1 transition-colors rounded-md cursor-pointer'

export default function PostCardIconButton({
    tooltipContent,
    className = "",
    disabled,
    children,
    onClick,
    dontStopPropagation
}: PostCardIconButtonProps) {
    return (
        <Tooltip
            tooltipContent={tooltipContent}
            triggerProps={{
                className: cn(IconButtonClasses, className),
                onClick(event) {
                    !dontStopPropagation && event.stopPropagation()
                    onClick?.(event)
                },
                disabled
            }}
        >
            {children}
        </Tooltip>
    )
}
