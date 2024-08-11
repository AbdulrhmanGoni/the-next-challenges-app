import { Button } from "@/components/shadcn-ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/shadcn-ui/form"
import { Textarea } from "@/components/shadcn-ui/textarea"
import UserAvatar from "../UserAvatar"
import useAddCommentToPost from "@/hooks/useAddCommentToPost"
import useUserData from "@/hooks/useUserData"

export default function PostCommentsForm({ postId }: PropsWithPostId) {

    const { userData } = useUserData();
    const { form, onSubmit } = useAddCommentToPost({ postId });

    return (
        <div className="bg-card-hover rounded-sm p-2.5">
            <UserAvatar />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="mt-2.5 border-y-white flex flex-col"
                >
                    <FormField
                        control={form.control}
                        name="comment"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Textarea
                                        placeholder="شارك رأيك عن الموضوع"
                                        className="border-0 !border-y rounded-none bg-transparent focus-visible:ring-offset-0 focus-visible:ring-transparent"
                                        {...field}
                                        disabled={!userData}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        size="sm"
                        type="submit"
                        disabled={!userData}
                        className={`mt-2.5 self-end disabled:pointer-events-auto disabled:cursor-not-allowed`}
                    >
                        ارسل
                    </Button>
                </form>
            </Form>
        </div>
    )
}
