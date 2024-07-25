import accessTokenCookieName from "@/constants/accessTokenCookieName";
import useGraphqlMutation from "@/lib/hooks/useGraphqlMutation";
import { gql } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCookies } from "next-client-cookies";
import { ControllerRenderProps, useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { logInRawShape } from "./useLogInFormLogic";
import convertToArabic from "@/lib/convertToArabic";
import {
  invalidImageTypeMessage,
  tooLargeImageMessage,
  validateImageFileSize,
  validateImageFileType,
} from "@/utils/imageFileValidation";

const namesRole = (fieldName: string) => {
  return z
    .string({ message: `يجب ان تكتب ${fieldName} هنا` })
    .min(3, `${fieldName} يجب ان يتكون من ${convertToArabic(3)} احرف على الأقل`)
    .max(50, `${fieldName} يجب ان لا يتخطى ال ${convertToArabic(50)} حرف`);
};

const formSchema = z.object({
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

const SignUpMutation = gql`
  mutation SignUp($newUser: SignUpUserInput!) {
    signUpUser(signUpUserInput: $newUser) {
      accessToken
    }
  }
`;

type SignUpActionResponse = {
  signUpUser?: {
    accessToken: string;
  };
  error?: string;
};

type SignUpFormSchemaType = z.infer<typeof formSchema>;
export type SignUpFormType = UseFormReturn<SignUpFormSchemaType>;

export type SignUpFormFieldType<field extends keyof SignUpFormSchemaType> =
  ControllerRenderProps<SignUpFormSchemaType, field>;

type SignUpMutationPayload = {
  firstName: string;
  lastName: string;
  email: string;
  headline: string;
  password: string;
  avatar?: User["avatar"];
};

export default function useSignUpFormLogic() {
  const form = useForm<SignUpFormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      avatar: undefined,
      email: "",
      headline: "",
      password: "",
      password2: "",
    },
  });

  const { state, error, action, isLoading } = useGraphqlMutation<
    SignUpMutationPayload,
    SignUpActionResponse
  >();

  const cookies = useCookies();

  async function onSubmit(formData: SignUpFormSchemaType) {
    const { password2, avatar, ...newUser } = formData;
    if (newUser.password === password2) {
      action({
        query: SignUpMutation,
        variables: { newUser },
        onSuccess: (res) => {
          if (res.signUpUser?.accessToken) {
            cookies.set(accessTokenCookieName, res.signUpUser.accessToken);
            location.replace("/");
          }
        },
      });
    } else {
      const passwordErrorMessage = {
        message: "تأكد من ان كلمتا المرور متطابقتان",
        types: { pattern: true, validate: true },
      };
      form.setError("password", passwordErrorMessage);
      form.setError("password2", passwordErrorMessage);
    }
  }

  return {
    form,
    onSubmit,
    isLoading,
    state,
    error,
  };
}
