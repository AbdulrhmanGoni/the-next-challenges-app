import { AlertOctagon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../shadcn-ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../shadcn-ui/card";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

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
                    <Alert variant="destructive">
                        <AlertOctagon className="h-4 w-4" />
                        <AlertTitle>خطأ !</AlertTitle>
                        <AlertDescription>
                            {props.errorMessage}
                        </AlertDescription>
                    </Alert>
                }
            </CardHeader>
            <CardContent>
                {props.children}
            </CardContent>
        </Card>
    )
}
