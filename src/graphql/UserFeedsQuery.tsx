import { gql } from "@apollo/client";

export const defaultUserFeedsPaginationModel: PaginationModel = {
  page: 1,
  pageSize: 15,
}
export const getPostsQuery = gql`
query UserFeeds($paginationOptions: PaginationOptions!) {
  userFeeds(paginationOptions: $paginationOptions) {
    posts {
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
        avatar {
          id
          src
        }
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
    areThereMore
  }
}
`;
