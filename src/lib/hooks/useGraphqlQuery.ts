import { useEffect, useState } from "react";
import graphglQueryAction from "../graphql/graphglQueryAction";
import { GraphqlQueryOptions, GraphqlQueryType } from "../graphql/types";

export default function useGraphqlQuery<T>(
  query: GraphqlQueryType<T>,
  options?: GraphqlQueryOptions<T>
) {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    setIsLoading(true);
    graphglQueryAction<T>(JSON.stringify(query), options?.variables)
      .then(({ data }) => {
        setData(data);
      })
      .catch((error) => {
        setError(error?.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { data, isLoading, error };
}
