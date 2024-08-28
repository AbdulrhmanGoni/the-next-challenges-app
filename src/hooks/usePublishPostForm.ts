import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import useImagesCloud from "./useImageUploader";
import publishPostFormSchema from "../validation/publishPostFormValidation";
import usePublishPost, { CreatePostInput } from "./usePublishPost";

export type PublishPostFormValues = z.infer<typeof publishPostFormSchema>;
export type PublishPostFormType = UseFormReturn<PublishPostFormValues>;

const defaultValues: Partial<PublishPostFormValues> = {
  title: "",
  category: "",
  body: "",
  tags: [],
  resources: [{ link: "", title: "", type: "" }],
};

export default function usePublishPostForm() {
  const form = useForm<PublishPostFormValues>({
    resolver: zodResolver(publishPostFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const { publishPost, isLoading, state } = usePublishPost();

  const { uploadImage, isLoading: imageIsUploading } = useImagesCloud();

  async function onSubmit(formData: PublishPostFormValues) {
    const newPost = await prepareMutationPayload(formData);
    if (newPost) {
      publishPost(newPost, () => {
        form.reset(defaultValues);
        form.clearErrors();
      });
    }
  }

  async function prepareMutationPayload(
    formData: PublishPostFormValues
  ): Promise<CreatePostInput | void> {
    const thumbnail = await uploadImage(
      form.getValues("thumbnail"),
      "postThumbnail"
    );
    if (thumbnail) {
      return {
        ...formData,
        tags: formData.tags.map((tag) => tag.tagName),
        thumbnail,
      };
    } else {
      form.setError("thumbnail", { message: "فشل رفع صورة الغلاف للمنشور" });
    }
  }

  return {
    form,
    defaultValues,
    onSubmit,
    isLoading: isLoading || imageIsUploading,
    state,
  };
}
