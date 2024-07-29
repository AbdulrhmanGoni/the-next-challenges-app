import graphglQueryAction from "@/graphql/graphglQueryAction";
import { getPostsQuery } from "../graphql/UserFeedsQuery";

export default async function getHomePagePosts() {
  "use server";

  const res = await graphglQueryAction<{ userFeeds: Post[] }>(getPostsQuery);
  return res.data.userFeeds;
}
