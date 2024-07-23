"use client"
import { Button } from "@/components/shadcn-ui/button"
import { Input } from "@/components/shadcn-ui/input"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/shadcn-ui/form"
import useLogInFormLogic from "@/hooks/useLogInFormLogic"
import FormCard from "./FormCard"
import Link from "next/link"
import LoadingOverlay from "../LoadingOverlay"

export default function LogInForm() {

    const { form, onSubmit, error, isLoading } = useLogInFormLogic();

    return (
        <FormCard
            title="تسجيل الدخول"
            description="أدخل معلومات حسابك الصحيحة لتسجيل دخولك"
            errorMessage={error}
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mx-auto max-w-sm">
                    <div className="grid gap-2">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>البريد الإلكتروني</FormLabel>
                                    <FormControl>
                                        <Input placeholder="البريد الإلكتروني" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid gap-2">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>كلمة المرور</FormLabel>
                                    <FormControl>
                                        <Input placeholder="كلمة المرور" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Link href="/sign-up" className="hover:underline block w-fit ml-auto text-sm cursor-pointer">
                        لا تمتلك حساب؟ انشئ حساباً الآن
                    </Link>
                    <Button type="submit" className="w-full">
                        تسجيل الدخول
                    </Button>
                </form>
            </Form>
            {isLoading && <LoadingOverlay />}
        </FormCard>
    )
}
