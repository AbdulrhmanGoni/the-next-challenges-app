import accessTokenCookieName from "@/constants/accessTokenCookieName";
import convertToArabic from "@/lib/convertToArabic";
import useGraphqlMutation from "@/lib/hooks/useGraphqlMutation";
import { gql } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const logInRawShape: { email: z.ZodString; password: z.ZodString } = {
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

const formSchema = z.object(logInRawShape);

const LogInMutation = gql`
  mutation LogIn($userCredentials: LogInUserInput!) {
    logInUser(logInUserInput: $userCredentials) {
      accessToken
    }
  }
`;

type LogInActionResponse = {
  logInUser?: {
    accessToken: string;
  };
  error?: string;
};

export default function useLogInFormLogic() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { state, action, isLoading } = useGraphqlMutation<
    z.infer<typeof formSchema>,
    LogInActionResponse
  >();

  const cookies = useCookies();
  const router = useRouter();

  async function onSubmit(userCredentials: z.infer<typeof formSchema>) {
    action({
      variables: { userCredentials },
      query: LogInMutation,
      onSuccess: (res) => {
        if (res.logInUser?.accessToken) {
          router.replace("/");
          cookies.set(accessTokenCookieName, res.logInUser.accessToken);
        }
      },
    });
  }

  return {
    form,
    onSubmit,
    state,
    isLoading,
  };
}
