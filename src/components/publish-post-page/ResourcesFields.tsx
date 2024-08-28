import { Button } from '../shadcn-ui/button'
import { CirclePlusIcon, LinkIcon, YoutubeIcon } from 'lucide-react'
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '../shadcn-ui/form'
import { cn } from '@/lib/utils'
import { Input } from '../shadcn-ui/input'
import { useFieldArray } from 'react-hook-form'
import { PublishPostFormType } from '@/hooks/usePublishPostForm'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../shadcn-ui/select'
import { postsResourcesTypes } from '@/constants/postsResourcesTypes'
import { postsResourcesTypesIcons } from '@/constants/postsResourcesTypesIcons'

interface ResourcesFieldsProps {
    form: PublishPostFormType,
}

export default function ResourcesFields({ form }: ResourcesFieldsProps) {

    const { fields, append } = useFieldArray({
        name: "resources",
        control: form.control,
    });

    return (
        <div className='space-y-2'>
            {fields.map((field, index) => (
                <div key={field.id}>
                    <FormLabel className={cn(index !== 0 && "opacity-0 h-1", "text-md flex items-center gap-2 mb-2")}>
                        {<LinkIcon />}
                        المصادر
                    </FormLabel>
                    <FormDescription className={cn(index !== 0 && "hidden", "mb-2")}>
                        ارفق مصادراً يمكن للقراء من خلالها إستكشاف الموضوع والتعلم عنه اكثر
                    </FormDescription>
                    <div key={field.id} className='space-y-2'>
                        <div className='flex gap-2'>
                            <FormField
                                control={form.control}
                                name={`resources.${index}.title`}
                                render={({ field }) => (
                                    <FormItem className='w-full'>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder='عنوان او اسم الرابط'
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={`resources.${index}.type`}
                                render={({ field }) => (
                                    <FormItem className='w-full'>
                                        <Select dir="rtl" onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className='text-muted-foreground'>
                                                    <SelectValue placeholder='نوع الرابط' />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {postsResourcesTypes.map((resourceType) => {
                                                    const Icon = postsResourcesTypesIcons[resourceType]
                                                    return (
                                                        <SelectItem
                                                            key={resourceType}
                                                            value={resourceType}
                                                        >
                                                            <Icon size={18} className='inline-block me-2' />
                                                            {resourceType}
                                                        </SelectItem>
                                                    )
                                                })}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name={`resources.${index}.link`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input {...field} placeholder='https://...' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
            ))}
            <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => append({ title: "", link: "", type: "" })}
            >
                <CirclePlusIcon className="ml-2 h-4 w-4" /> أضافة مصدر آخر
            </Button>
        </div>
    )
}
