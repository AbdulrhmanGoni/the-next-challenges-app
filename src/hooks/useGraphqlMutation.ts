import graphglMutationAction from "../graphql/graphglMutationAction";
import { GraphqlQueryType } from "../graphql/types";
import useRequestState from "./useRequestState";

type Variables<T> = { [variable: string]: T };
type MutationActionPayload<T, Res> = {
  variables: Variables<T>;
  query: GraphqlQueryType<T>;
  onSuccess: (res: Res) => void;
};

export default function useGraphqlMutation<T, MutationActionResponse>() {
  const { data, setData, isLoading, setIsLoading, error, setError } =
    useRequestState<MutationActionResponse>();

  async function action(
    payload: MutationActionPayload<T, MutationActionResponse>
  ) {
    setIsLoading(true);
    graphglMutationAction<MutationActionResponse>(
      JSON.stringify(payload.query),
      payload.variables
    )
      .then((response) => {
        if (response.data) {
          payload.onSuccess(response.data);
          setData(response.data);
        } else {
          if (response.errors) {
            setError(response.errors[0].message);
          }
        }
      })
      .catch((error) => setError(error?.message))
      .finally(() => setIsLoading(false));
  }

  return {
    state: data,
    isLoading,
    error: error,
    action,
  };
}
