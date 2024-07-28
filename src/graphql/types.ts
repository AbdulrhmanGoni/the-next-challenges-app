import {
  DocumentNode,
  OperationVariables,
  QueryHookOptions,
  TypedDocumentNode,
} from "@apollo/client";

export type GraphqlQueryType<T> =
  | DocumentNode
  | TypedDocumentNode<T, OperationVariables>;

export type GraphqlQueryOptions<T> =
  | QueryHookOptions<NoInfer<T>, OperationVariables>
  | undefined;
