"use client"
import { Form, FormField } from "@/components/shadcn-ui/form"
import { Button } from "@/components/shadcn-ui/button"
import { Input } from "@/components/shadcn-ui/input"
import useSignUpFormLogic from "@/hooks/useSignUpFormLogic"
import FormCard from "./FormCard"
import Link from "next/link"
import LoadingOverlay from "../LoadingOverlay"
import FormFieldItem from "../FormFieldItem"

export default function SignUpForm() {

    const { form, onSubmit, error, isLoading } = useSignUpFormLogic();

    return (
        <FormCard
            title="إنشاء حساب"
            description="أدخل معلوماتك لإنشاء حساب جديد لك"
            className="max-w-xl"
            errorMessage={error}
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mx-auto max-w-xl">
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormFieldItem label="الإسم الأول">
                                        <Input placeholder="الإسم الأول" {...field} />
                                    </FormFieldItem>
                                )}
                            />
                        </div>
                        <div>
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormFieldItem label="الإسم الثاني">
                                        <Input placeholder="الإسم الثاني" {...field} />
                                    </FormFieldItem>
                                )}
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex-1">
                            <FormField
                                control={form.control}
                                name="headline"
                                render={({ field }) => (
                                    <FormFieldItem label="العنوان الرئيسي او التخصص">
                                        <Input placeholder="العنوان الرئيسي او التخصص" {...field} />
                                    </FormFieldItem>
                                )}
                            />
                        </div>
                    </div>
                    <div>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormFieldItem label="البريد الإلكتروني">
                                    <Input placeholder="البريد الإلكتروني" {...field} />
                                </FormFieldItem>
                            )}
                        />
                    </div>
                    <div>
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormFieldItem label="كلمة المرور">
                                    <Input type="password" placeholder="كلمة المرور" {...field} />
                                </FormFieldItem>
                            )}
                        />
                    </div>
                    <div>
                        <FormField
                            control={form.control}
                            name="password2"
                            render={({ field }) => (
                                <FormFieldItem label="كلمة المرور مرة اخرى">
                                    <Input type="password" placeholder="كلمة المرور مرة اخرى" {...field} />
                                </FormFieldItem>
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
