import convertToArabic from "@/lib/convertToArabic";
import { z } from "zod";
import { postsResourcesTypes } from "@/constants/postsResourcesTypes";
import { postsCategories } from "@/constants/postsCategories";
import {
  validateImageFileSize,
  validateImageFileType,
  invalidImageTypeMessage,
  tooLargeImageMessage,
} from "@/utils/imageFileValidation";

const publishPostFormSchema = z.object({
  title: z
    .string({ required_error: "رجاءً اكتب عنواناً للموضوع" })
    .min(3, { message: "العنوان يجب ان يتكون من ثلاث حروف على الأقل" })
    .max(130, {
      message: `لا يجب ان يتخطى العنوان ال ${convertToArabic(130)} حرف`,
    }),

  body: z
    .string({ required_error: "رجاءً اكتب وصفاً للموضوع" })
    .min(3, { message: "الوصف يجب ان يتكون من ثلاث حروف على الأقل" })
    .max(1000, {
      message: `لا يجب ان يتخطى الوصف ال ${convertToArabic(1000)} حرف`,
    }),

  category: z.enum(postsCategories, {
    required_error: "رجاءً إختر فئة الموضوع",
  }),

  tags: z.array(
    z.object({
      tagName: z
        .string()
        .min(2, { message: `ادخل علامة من حرفين على الاقل` })
        .max(30, {
          message: `العلامة يجب ان لا تتخطى ال ${convertToArabic(30)} حرف`,
        }),
    })
  ),

  thumbnail: z
    .instanceof(File, { message: "رجاءً اضف صورة غلاف للموضوع" })
    .refine(validateImageFileType, invalidImageTypeMessage)
    .refine(validateImageFileSize, tooLargeImageMessage),

  resources: z.array(
    z.object({
      link: z.string().url({ message: "رجاءً ادخل رابطاً صالحاً للمصدر" }),
      title: z
        .string({
          required_error: "رجاءً اكتب اسماً أو عنواناً عن الرابط",
        })
        .min(3, {
          message: `رجاءً اكتب اسماً أو عنواناً لا يقل عن ال ${convertToArabic(
            3
          )} حرف`,
        })
        .max(35, {
          message: `رجاءً اكتب اسماً أو عنواناً لا يتخطى عن ال ${convertToArabic(
            35
          )} حرف`,
        }),
      type: z.enum(postsResourcesTypes, {
        required_error: "رجاءً اختر نوع المصدر",
      }),
    })
  ),
});

export default publishPostFormSchema;
