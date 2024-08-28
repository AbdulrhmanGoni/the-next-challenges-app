"use client"
import { PublishPostFormType } from "@/hooks/usePublishPostForm";
import { Button } from "../shadcn-ui/button";
import { CirclePlusIcon, TagsIcon, XIcon } from "lucide-react";
import { Input } from "../shadcn-ui/input";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../shadcn-ui/form";
import { useFieldArray } from "react-hook-form";

type PostFormTagsFieldProps = {
    form: PublishPostFormType
}

export default function PostFormTagsField({ form }: PostFormTagsFieldProps) {

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "tags"
    });

    return (
        <div>
            <FormLabel className="text-md flex items-center gap-2">
                {<TagsIcon />}
                علامات التصنيف
            </FormLabel>
            <FormDescription className="mb-3 mt-1">
                اضف علامات تصنيف لتساعد خوارزميات البحث بالعثور على المنشور
            </FormDescription>
            <div className="w-full flex gap-2 flex-wrap">
                {
                    fields.map((field, index) => (
                        <FormField
                            control={form.control}
                            name={`tags.${index}.tagName`}
                            key={field.id}
                            render={({ field }) => (
                                <FormItem className="relative">
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    <XIcon
                                        className="absolute size-3.5 -right-1.5 -top-1.5 !mt-0 cursor-pointer"
                                        onClick={() => { remove(index) }}
                                    />
                                </FormItem>
                            )}
                        />
                    ))
                }
            </div>
            <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => append({ tagName: "" })}
            >
                <CirclePlusIcon className="ml-2 h-4 w-4" /> أضافة العلامة
            </Button>
        </div>
    )
}
