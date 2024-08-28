import { PublishPostFormType } from "@/hooks/usePublishPostForm";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "../shadcn-ui/form";
import { GroupIcon } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "../shadcn-ui/select";
import { postsCategories } from "@/constants/postsCategories";

type PostFormTagsFieldProps = {
    form: PublishPostFormType
}

export default function PostFormCategoriesField({ form }: PostFormTagsFieldProps) {

    return (
        <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="text-md flex items-center gap-2">
                        {<GroupIcon />}
                        الفئة
                    </FormLabel>
                    <Select dir="rtl" onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger className="text-muted-foreground">
                                <SelectValue placeholder="الفئة" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {postsCategories.map((category) => (
                                <SelectItem key={category} value={category}>{category}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormDescription>
                        اختار الفئة الذي ينتمي له الموضوع او المحتوى الذي تريد مشاركته
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
