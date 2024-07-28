"use server";
import { cookies } from "next/headers";
import { getClient } from "../lib/apolloServerClient";
import accessTokenCookieName from "@/constants/accessTokenCookieName";
import { OperationVariables } from "@apollo/client";
import { GraphqlQueryType } from "./types";
import parseQueryDoc from "./parseQueryDoc";

export default async function graphglMutationAction<T>(
  mutation: string | GraphqlQueryType<T>,
  variables?: OperationVariables
) {
  const client = getClient();
  const accessToken = cookies().get(accessTokenCookieName)?.value;

  return await client.mutate<T>({
    mutation: parseQueryDoc<T>(mutation),
    context: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
    variables,
  });
}
