import { z } from "zod";
import logInRawShape from "./logInFormValidation";
import {
  invalidImageTypeMessage,
  tooLargeImageMessage,
  validateImageFileSize,
  validateImageFileType,
} from "@/utils/imageFileValidation";
import convertToArabic from "@/lib/convertToArabic";

const namesRole = (fieldName: string) => {
  return z
    .string({ message: `يجب ان تكتب ${fieldName} هنا` })
    .min(3, `${fieldName} يجب ان يتكون من ${convertToArabic(3)} احرف على الأقل`)
    .max(50, `${fieldName} يجب ان لا يتخطى ال ${convertToArabic(50)} حرف`);
};

const signUpFormSchema = z.object({
  firstName: namesRole("الإسم الأول"),
  lastName: namesRole("الإسم الأخير"),
  headline: namesRole("العنوان الرئيسي او التخصص"),
  avatar: z
    .instanceof(File)
    .refine(validateImageFileType, invalidImageTypeMessage)
    .refine(validateImageFileSize, tooLargeImageMessage)
    .optional(),
  ...logInRawShape,
  password2: logInRawShape.password,
});

export default signUpFormSchema;
