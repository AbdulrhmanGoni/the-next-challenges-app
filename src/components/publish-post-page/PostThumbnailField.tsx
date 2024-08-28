import { ChangeEvent, useEffect, useState } from 'react';
import { CircleXIcon, ImageIcon, ImagePlusIcon } from 'lucide-react'
import { Input } from '../shadcn-ui/input';
import { PublishPostFormType, PublishPostFormValues } from '@/hooks/usePublishPostForm';
import { FormField } from '../shadcn-ui/form';
import { ControllerRenderProps } from 'react-hook-form';
import Image from 'next/image';
import FormFieldItem from '../FormFieldItem';

type PostThumbnailFieldProps = {
    form: PublishPostFormType
}

type FieldType = ControllerRenderProps<PublishPostFormValues, "thumbnail">

export default function PostThumbnailField({ form }: PostThumbnailFieldProps) {

    const [inputRef, setRef] = useState<HTMLInputElement | null>(null)
    const [selectedThumbnailSrc, setSelectedThumbnailSrc] = useState<string | ArrayBuffer | null>(null)

    function handleChange(event: ChangeEvent<HTMLInputElement>, field: FieldType) {
        if (event.target.form) {
            const thumbnail = new FormData(event.target.form).get(field.name) as File
            if (thumbnail.name && thumbnail.size) {
                form.setValue("thumbnail", thumbnail)
                const reader = new FileReader();
                reader.readAsDataURL(thumbnail);
                reader.onload = (e) => {
                    const thumbnailFieldValue = form.getValues("thumbnail")
                    e.target && thumbnailFieldValue && setSelectedThumbnailSrc(e.target.result)
                };
            } else {
                setSelectedThumbnailSrc(null)
            }
        }
    }

    useEffect(() => {
        setSelectedThumbnailSrc(null)
    }, [form.getValues("thumbnail")])

    return (
        <FormField
            control={form.control}
            name="thumbnail"
            render={({ field }) => (
                <FormFieldItem
                    label="صورة الغلاف"
                    description="ارفق صورة غلاف للمنشور تكون معبرة عن محتوى المنشور"
                    Icon={ImageIcon}
                >
                    <>
                        <div
                            onClick={() => { inputRef?.click() }}
                            className='relative w-80 h-52 flex items-center justify-center cursor-pointer border border-muted rounded-md'
                        >
                            <ImagePlusIcon size={35} />
                            <Input
                                type='file'
                                {...field}
                                value=""
                                onChange={(e) => {
                                    handleChange(e, field)
                                }}
                                ref={(instance) => {
                                    field.ref(instance)
                                    setRef(instance)
                                }}
                                className="hidden"
                            />
                            {
                                selectedThumbnailSrc &&
                                <Image
                                    src={selectedThumbnailSrc as string}
                                    className='absolute w-full h-full right-0 top-0'
                                    alt="Post thumbnail"
                                    width={320}
                                    height={208}
                                />
                            }
                        </div>
                        {
                            selectedThumbnailSrc &&
                            <div className='flex gap-2'>
                                <ImagePlusIcon
                                    className='cursor-pointer'
                                    onClick={() => inputRef?.click()}
                                />
                                <CircleXIcon
                                    className='cursor-pointer'
                                    onClick={() => { form.resetField("thumbnail") }}
                                />
                            </div>
                        }
                    </>
                </FormFieldItem>
            )}
        />
    )
}
