import accessTokenCookieName from "@/constants/accessTokenCookieName";
import useGraphqlMutation from "@/hooks/useGraphqlMutation";
import { gql } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCookies } from "next-client-cookies";
import { useForm } from "react-hook-form";
import { z } from "zod";
import logInRawShape from "@/validation/logInFormValidation";

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

  const { state, error, action, isLoading } = useGraphqlMutation<
    z.infer<typeof formSchema>,
    LogInActionResponse
  >();

  const cookies = useCookies();

  async function onSubmit(userCredentials: z.infer<typeof formSchema>) {
    action({
      variables: { userCredentials },
      query: LogInMutation,
      onSuccess: (res) => {
        if (res.logInUser?.accessToken) {
          location.replace("/");
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
    error,
  };
}
