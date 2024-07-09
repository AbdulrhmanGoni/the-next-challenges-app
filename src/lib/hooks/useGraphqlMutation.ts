import graphglMutationAction from "../graphql/graphglMutationAction";
import { GraphqlQueryType } from "../graphql/types";
import { useFormState } from "react-dom";

type Variables<T> = { [variable: string]: T };
type MutationActionPayload<T, Res> = {
  variables: Variables<T>;
  query: GraphqlQueryType<T>;
  onSuccess: (res: Res) => void;
};

export default function useGraphqlMutation<T, MutationActionResponse>() {
  const [state, action, isLoading] = useFormState<
    MutationActionResponse,
    MutationActionPayload<T, MutationActionResponse>
  >(mutationAction, {} as Awaited<MutationActionResponse>);

  return { state, isLoading, action };
}

async function mutationAction<MutationActionResponse, T>(
  _previousState: MutationActionResponse,
  payload: MutationActionPayload<T, MutationActionResponse>
) {
  try {
    const response = await graphglMutationAction<MutationActionResponse>(
      JSON.stringify(payload.query),
      payload.variables
    );

    if (response.data) {
      payload.onSuccess(response.data);
      return response.data;
    } else {
      return {
        error: response.errors?.[0].message,
      } as MutationActionResponse;
    }
  } catch (error: any) {
    return {
      error: error?.message,
    } as MutationActionResponse;
  }
}
