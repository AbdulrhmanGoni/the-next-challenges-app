"use client"
import { Form, FormField } from "@/components/shadcn-ui/form"
import { Input } from "@/components/shadcn-ui/input"
import { Textarea } from "@/components/shadcn-ui/textarea"
import { Button } from "../shadcn-ui/button"
import { BookUpIcon, NotebookTextIcon, TextQuoteIcon } from "lucide-react"
import PostThumbnailField from "./PostThumbnailField"
import usePublishPostForm from "@/hooks/usePublishPostForm"
import ResourcesFields from "./ResourcesFields"
import PostFormTagsField from "./PostFormTagsField"
import PostFormCategoriesField from "./PostFormCategoriesField"
import LoadingOverlay from "../LoadingOverlay"
import FormFieldItem from "../FormFieldItem"

export default function PublishPostForm() {

    const { onSubmit, form, isLoading } = usePublishPostForm();

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 p-3 max-w-[700px] w-full"
                id="publish-post-form"
            >
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormFieldItem
                            label="عنوان المنشور"
                            description="العنوان الخاص بموضوع المنشور الذي ستقوم بنشره"
                            Icon={TextQuoteIcon}
                        >
                            <Input {...field} />
                        </FormFieldItem>
                    )}
                />
                <PostThumbnailField form={form} />
                <FormField
                    control={form.control}
                    name="body"
                    render={({ field }) => (
                        <FormFieldItem
                            label="الوصف"
                            description="أكتب وصفاً مفصلاً عن الموضوع الذي تريد مشاركته"
                            Icon={NotebookTextIcon}
                        >
                            <Textarea className="resize" {...field} />
                        </FormFieldItem>
                    )}
                />
                <PostFormCategoriesField form={form} />
                <PostFormTagsField form={form} />
                <ResourcesFields form={form} />
                <Button className="float-left" type="submit">
                    <BookUpIcon className="ml-2 h-[18px] w-[18px]" /> انشر
                </Button>
            </form>
            {isLoading && <LoadingOverlay />}
        </Form>
    )
}