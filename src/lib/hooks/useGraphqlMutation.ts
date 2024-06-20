import { useEffect, useState } from "react";
import graphglMutationAction from "../graphql/graphglMutationAction";
import { GraphqlQueryOptions, GraphqlQueryType } from "../graphql/types";

export default function useGraphqlMutation<T>(
  query: GraphqlQueryType<T>,
  options?: GraphqlQueryOptions<T>
) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    graphglMutationAction<T>(JSON.stringify(query), options?.variables)
      .then(() => {})
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { isLoading };
}
