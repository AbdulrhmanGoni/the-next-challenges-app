import useRequestState from "@/hooks/useRequestState";
import getUploadingImageParameters, {
  ImageTypeToUpload,
} from "@/utils/getUploadingImageParameters";

export default function useImagesCloud() {
  const { isLoading, setIsLoading, error, setError } = useRequestState();

  async function uploadImage(
    imageFile: File,
    imageType: ImageTypeToUpload
  ): Promise<Image | void> {
    setIsLoading(true);

    const formParameters = await getUploadingImageParameters(imageType);
    const formData = new FormData();
    formData.append("file", imageFile);
    for (const key in formParameters) {
      formData.append(key, formParameters[key]);
    }

    const cloudinaryUrl = "https://api.cloudinary.com/v1_1";
    const cloudName = process.env.NEXT_PUBLIC_IMAGES_CLOUD_NAME as string;
    const uploadImagesUrl = `${cloudinaryUrl}/${cloudName}/image/upload`;

    return fetch(uploadImagesUrl, { method: "POST", body: formData })
      .then((res) => res.json())
      .then((res) => ({ id: res.public_id, src: res.secure_url } as Image))
      .catch((error) => setError(error?.message))
      .finally(() => setIsLoading(false));
  }

  return {
    uploadImage,
    isLoading,
    error,
  };
}
