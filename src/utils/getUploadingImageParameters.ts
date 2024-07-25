"use server";

import hash_sha1 from "./hash_SHA1";

const apiKey = process.env.UPLOAD_IMAGES_API_KEY as string;
const apiSecretKey = process.env.UPLOAD_IMAGES_API_SECRET_KEY as string;

const uploadPresets = {
  userAvatar: process.env.USERS_AVATARS_UPLOAD_PRESET as string,
  postThumbnail: process.env.POSTS_THUMBNAILS_UPLOAD_PRESET as string,
};

const publicIdPrefixes = {
  userAvatar: "users_avatars",
  postThumbnail: "posts_thumbnails",
};

export type ImageTypeToUpload = keyof typeof uploadPresets;

export default async function getUploadingImageParameters(
  imageType: ImageTypeToUpload
): Promise<Record<string, string>> {
  const timestamp = Date.now().toString();

  return {
    api_key: apiKey,
    timestamp,
    upload_preset: uploadPresets[imageType],
    public_id_prefix: publicIdPrefixes[imageType],
    signature: await createSignature(
      `public_id_prefix=${publicIdPrefixes[imageType]}`,
      `upload_preset=${uploadPresets[imageType]}`,
      `timestamp=${timestamp}`
    ),
  };
}

async function createSignature(...payload: string[]) {
  const signaturePayload = payload.sort().join("&") + apiSecretKey;
  return await hash_sha1(signaturePayload);
}
