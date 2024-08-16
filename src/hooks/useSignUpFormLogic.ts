import accessTokenCookieName from "@/constants/accessTokenCookieName";
import useGraphqlMutation from "@/hooks/useGraphqlMutation";
import { gql } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCookies } from "next-client-cookies";
import { ControllerRenderProps, useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import useImagesCloud from "./useImageUploader";
import signUpFormSchema from "@/validation/signUpFormValidation";

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

type SignUpFormSchemaType = z.infer<typeof signUpFormSchema>;
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
    resolver: zodResolver(signUpFormSchema),
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
  const { uploadImage, isLoading: imageIsUploading } = useImagesCloud();

  async function onSubmit(formData: SignUpFormSchemaType) {
    const { password2, avatar, ...newUser } = formData;
    if (newUser.password === password2) {
      let userAvatar;
      if (avatar) {
        userAvatar = await uploadImage(avatar, "userAvatar");
        if (!userAvatar) {
          form.setError("avatar", { message: "فشل رفع صورة الملف الشخصي" });
          return;
        }
      }

      action({
        query: SignUpMutation,
        variables: {
          newUser: {
            ...newUser,
            avatar: userAvatar,
          },
        },
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
    isLoading: isLoading || imageIsUploading,
    state,
    error,
  };
}
