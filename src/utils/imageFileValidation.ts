import convertToArabic from "@/lib/convertToArabic";

const ACCEPTED_FILES_EXTENTIONS = ["png", "jpg", "jpeg", "svg"];
const MAX_IMAGE_SIZE_IN_MEGA_BYTE = 50;
const ONE_MEGA_BYTE = 1024 * 1024;

const extentions = `( ${ACCEPTED_FILES_EXTENTIONS.join(" - ")} )`;
export const invalidImageTypeMessage = `يجب ان تكون الصورة بالإمتدادات التالية: ${extentions}`;
export const tooLargeImageMessage = `يجب ان لا بتجاوز حجم الصورة ال ${convertToArabic(
  MAX_IMAGE_SIZE_IN_MEGA_BYTE
)} ميجا بايت`;

export function validateImageFileType(file: File) {
  const fileExtention = file.name.substring(file.name.lastIndexOf(".") + 1);
  return ACCEPTED_FILES_EXTENTIONS.includes(fileExtention);
}

export function validateImageFileSize(file: File) {
  return file && file.size <= ONE_MEGA_BYTE * MAX_IMAGE_SIZE_IN_MEGA_BYTE;
}
