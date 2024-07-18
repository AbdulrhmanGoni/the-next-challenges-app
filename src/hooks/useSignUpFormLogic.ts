import accessTokenCookieName from "@/constants/accessTokenCookieName";
import useGraphqlMutation from "@/lib/hooks/useGraphqlMutation";
import { gql } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCookies } from "next-client-cookies";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { logInRawShape } from "./useLogInFormLogic";
import convertToArabic from "@/lib/convertToArabic";

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

type SignUpMutationPayload = {
  firstName: string;
  lastName: string;
  email: string;
  headline: string;
  password: string;
};

export default function useSignUpFormLogic() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      headline: undefined,
      password: undefined,
    },
  });

  const { state, action, isLoading } = useGraphqlMutation<
    SignUpMutationPayload,
    SignUpActionResponse
  >();

  const cookies = useCookies();

  async function onSubmit(formData: z.infer<typeof formSchema>) {
    const { password2, ...newUser } = formData;

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
  };
}
