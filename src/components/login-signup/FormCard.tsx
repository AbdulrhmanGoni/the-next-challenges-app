import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../shadcn-ui/card";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import Alert from "../Alert";

interface FormCardProps {
    title: string;
    description: string;
    errorMessage?: string;
    className?: string;
    children: ReactNode;
}

export default function FormCard(props: FormCardProps) {
    return (
        <Card className={cn("mx-auto max-w-sm w-full", props.className)}>
            <CardHeader>
                <CardTitle className="text-xl">{props.title}</CardTitle>
                <CardDescription>
                    {props.description}
                </CardDescription>
                {
                    props.errorMessage &&
                    <Alert
                        variant="error"
                        message={props.errorMessage}
                    />
                }
            </CardHeader>
            <CardContent>
                {props.children}
            </CardContent>
        </Card>
    )
}
