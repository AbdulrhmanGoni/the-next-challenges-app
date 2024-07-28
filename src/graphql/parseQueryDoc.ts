import { GraphqlQueryType } from "./types";

export default function parseQueryDoc<T>(query: string | GraphqlQueryType<T>) {
  return typeof query === "string"
    ? (JSON.parse(query) as GraphqlQueryType<T>)
    : query;
}
