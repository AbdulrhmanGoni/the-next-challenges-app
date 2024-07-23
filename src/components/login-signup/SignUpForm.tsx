"use client"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/shadcn-ui/form"
import { Button } from "@/components/shadcn-ui/button"
import { Input } from "@/components/shadcn-ui/input"
import useSignUpFormLogic from "@/hooks/useSignUpFormLogic"
import FormCard from "./FormCard"
import Link from "next/link"
import LoadingOverlay from "../LoadingOverlay"

export default function SignUpForm() {

    const { form, onSubmit, state, isLoading } = useSignUpFormLogic()

    return (
        <FormCard
            title="إنشاء حساب"
            description="أدخل معلوماتك لإنشاء حساب جديد لك"
            errorMessage={state.error}
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mx-auto max-w-sm">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>الإسم الأول</FormLabel>
                                        <FormControl>
                                            <Input placeholder="الإسم الأول" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid gap-2">
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>الإسم الثاني</FormLabel>
                                        <FormControl>
                                            <Input placeholder="الإسم الثاني" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <FormField
                            control={form.control}
                            name="headline"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>العنوان الرئيسي او التخصص</FormLabel>
                                    <FormControl>
                                        <Input placeholder="العنوان الرئيسي او التخصص" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
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
                                        <Input type="password" placeholder="كلمة المرور" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid gap-2">
                        <FormField
                            control={form.control}
                            name="password2"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>كلمة المرور مرة اخرى</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="كلمة المرور مرة اخرى" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Link href="/log-in" className="underline block w-fit ml-auto cursor-pointer">
                        اتمتلك حساب؟ سجل دخولك
                    </Link>
                    <Button
                        type="submit"
                        className="w-full"
                    >
                        إنشاء حساب
                    </Button>
                </form>
            </Form>
            {isLoading && <LoadingOverlay />}
        </FormCard>
    )
}
