import graphglQueryAction from "@/graphql/graphglQueryAction";
import {
  defaultUserFeedsPaginationModel,
  getPostsQuery,
} from "../graphql/UserFeedsQuery";

export default async function getHomePagePosts() {
  "use server";
  const res = await graphglQueryAction<{ userFeeds: UserFeedsResponse }>(
    getPostsQuery,
    { paginationOptions: defaultUserFeedsPaginationModel }
  );
  return res.data.userFeeds;
}
