import graphglQueryAction from "@/lib/graphql/graphglQueryAction";
import { gql } from "@apollo/client";

const getPostsQuery = gql`
  query UserFeeds {
    userFeeds {
      id
      title
      publishedAt
      category
      authorId
      upvotes
      downvotes
      userVote
      author {
        firstName
        lastName
        headline
        avatar
      }
      thumbnail {
        src
      }
      tags
      body
      commentsCount
      resources {
        link
        title
        type
      }
    }
  }
`;

export default async function getHomePagePosts() {
  "use server";

  const res = await graphglQueryAction<{ userFeeds: Post[] }>(getPostsQuery);
  return res.data.userFeeds;
}
