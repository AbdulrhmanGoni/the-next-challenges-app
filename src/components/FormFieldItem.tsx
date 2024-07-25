import { ReactNode } from "react";
import {
    FormControl,
    FormDescription,
    FormItem,
    FormLabel,
    FormMessage
} from "./shadcn-ui/form";
import { LucideIcon } from "lucide-react";

type FormFieldItemProps = {
    label: string;
    description?: string;
    Icon?: LucideIcon;
    children: ReactNode
}

export default function FormFieldItem({ label, description, Icon, children }: FormFieldItemProps) {
    return (
        <FormItem>
            <FormLabel className="text-md flex items-center gap-2">
                {Icon && <Icon />}
                {label}
            </FormLabel>
            <FormControl>
                {children}
            </FormControl>
            {
                description &&
                <FormDescription>
                    {description}
                </FormDescription>
            }
            <FormMessage />
        </FormItem>
    )
}
