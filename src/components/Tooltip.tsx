import { ReactNode, RefAttributes } from 'react';
import {
    Tooltip as TooltipContainer,
    TooltipContent,
    TooltipTrigger
} from './shadcn-ui/tooltip'
import {
    TooltipProviderProps,
    TooltipProps as TooltipContainerProps,
    TooltipTriggerProps,
    TooltipContentProps
} from '@radix-ui/react-tooltip';

export interface TooltipProps {
    children: ReactNode;
    tooltipContent?: string;
    providerProps?: TooltipProviderProps;
    containerProps?: TooltipContainerProps;
    triggerProps?: TooltipTriggerProps & RefAttributes<HTMLButtonElement>;
    contentProps?: TooltipContentProps
}

export default function Tooltip({
    children,
    tooltipContent,
    triggerProps,
    containerProps,
    contentProps
}: TooltipProps) {

    return (!
        !tooltipContent ?
        <TooltipContainer delayDuration={200} {...containerProps}>
            <TooltipTrigger {...triggerProps}>
                {children}
            </TooltipTrigger>
            <TooltipContent {...contentProps}>
                <p>{tooltipContent}</p>
            </TooltipContent>
        </TooltipContainer> : children
    )
}
