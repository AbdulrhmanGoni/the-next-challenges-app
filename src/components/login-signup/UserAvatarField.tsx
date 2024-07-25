"use client"
import { ChangeEvent, useState } from "react";
import { FormField } from "../shadcn-ui/form";
import { Input } from "../shadcn-ui/input";
import { SignUpFormFieldType, SignUpFormType } from "@/hooks/useSignUpFormLogic";
import { Avatar, AvatarImage } from "../shadcn-ui/avatar";
import { CircleXIcon, ImagePlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Tooltip from "../Tooltip";

export default function UserAvatarField({ form }: { form: SignUpFormType }) {

    const [inputRef, setRef] = useState<HTMLInputElement | null>(null)
    const [selectedAvatar, setSelectedAvatar] = useState<string | ArrayBuffer | null>(null)

    function handleChange(event: ChangeEvent<HTMLInputElement>, field: SignUpFormFieldType<"avatar">) {
        if (event.target.form) {
            const avatar = new FormData(event.target.form).get(field.name) as File
            if (avatar.name && avatar.size) {
                form.setValue("avatar", avatar)
                const reader = new FileReader();
                reader.readAsDataURL(avatar);
                reader.onload = (e) => {
                    const avatarFieldValue = form.getValues("avatar")
                    e.target && avatarFieldValue && setSelectedAvatar(e.target.result)
                };
            } else {
                setSelectedAvatar(null)
            }
        }
    }

    return (
        <FormField
            control={form.control}
            name="avatar"
            render={({ field }) => (
                <div className="flex gap-1">
                    <div
                        className={cn(
                            "relative size-20 border rounded-full flex items-center justify-center",
                            !!form.getFieldState("avatar").error ? "border-destructive" : "border-muted"
                        )}
                    >
                        <Input
                            type="file"
                            {...field}
                            value=""
                            onChange={(e) => handleChange(e, field)}
                            ref={(instance) => {
                                field.ref(instance)
                                setRef(instance)
                            }}
                            className="hidden"
                        />
                        {
                            selectedAvatar ?
                                <Avatar className="size-full">
                                    <AvatarImage id="user-avatar-input-id" src={selectedAvatar as string} />
                                </Avatar>
                                : <div
                                    className="size-full flex items-center justify-center cursor-pointer"
                                    onClick={() => inputRef?.click()}
                                >
                                    <ImagePlusIcon />
                                </div>
                        }
                    </div>
                    {
                        selectedAvatar &&
                        <div className="flex flex-col gap-2 justify-evenly">
                            <CircleXIcon
                                size={19}
                                className="cursor-pointer"
                                onClick={() => {
                                    setSelectedAvatar(null)
                                    form.resetField("avatar")
                                }}
                            />
                            <ImagePlusIcon
                                size={19}
                                className="cursor-pointer"
                                onClick={() => inputRef?.click()}
                            />
                        </div>
                    }
                    <Tooltip
                        tooltipContent={form.getFieldState("avatar").error?.message}
                        contentProps={{ className: "text-destructive" }}
                        containerProps={{
                            open: !!form.getFieldState("avatar").error
                        }}
                    >
                        <></>
                    </Tooltip>
                </div>
            )}
        />
    )
}
