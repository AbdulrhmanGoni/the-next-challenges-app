import convertToArabic from "@/lib/convertToArabic";
import { z } from "zod";

export const logInFormSchema: { email: z.ZodString; password: z.ZodString } = {
  email: z
    .string({ message: "يجب ان تدخل بريداً إلكترونياً" })
    .min(
      6,
      `البريد الإلكتروني يجب ان يتكون من ${convertToArabic(6)} احرف على الأقل`
    )
    .max(
      100,
      `البريد الإلكتروني يجب ان لايتخطى ال ${convertToArabic(100)} حرف`
    ),

  password: z
    .string({ message: "يجب ان تتكون كلمة المرور من حروف وأرقام" })
    .min(8, `يجب ان تتكون كلمة المرور من ${convertToArabic(8)} حروف على الأقل`)
    .max(150, `كلمة المرور يجب ان لا تتجاوز ال ${convertToArabic(150)} حرف`),
};

export default logInFormSchema;
