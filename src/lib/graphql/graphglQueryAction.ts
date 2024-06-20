"use server";
import { cookies } from "next/headers";
import { getClient } from "../apolloServerClient";
import accessTokenCookieName from "@/constants/accessTokenCookieName";
import { OperationVariables } from "@apollo/client";
import { GraphqlQueryType } from "./types";
import parseQueryDoc from "./parseQueryDoc";

export default async function graphglQueryAction<T>(
  query: string | GraphqlQueryType<T>,
  variables?: OperationVariables
) {
  const client = getClient();
  const accessToken = cookies().get(accessTokenCookieName)?.value;

  return await client.query<T>({
    query: parseQueryDoc<T>(query),
    context: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
    variables,
  });
}
