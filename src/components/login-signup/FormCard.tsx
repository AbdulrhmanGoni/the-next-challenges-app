import { AlertOctagon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../shadcn-ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../shadcn-ui/card";
import { ReactNode } from "react";

interface FormCardProps {
    title: string;
    description: string;
    errorMessage?: string;
    children: ReactNode;
}

export default function FormCard(props: FormCardProps) {
    return (
        <Card className="mx-auto max-w-sm">
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
