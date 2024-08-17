import { gql } from "@apollo/client";
import useUserData from "./useUserData";
import usePagination from "./usePagination";

const UserBookmarksQuery = gql`
  query UserBookmarks($paginationOptions: PaginationOptions!) {
    getUserBookmarks(paginationOptions: $paginationOptions) {
      posts {
        id
        title
        publishedAt
        category
        authorId
        author {
          id
          firstName
          lastName
          headline
          avatar {
            id
            src
          }
        }
        upvotes
        downvotes
        userVote
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

export default function useUserBookmarks() {
  const {
    areThereMoreData: areThereMorePosts,
    data: posts,
    error,
    isLoading,
    loadMore: loadMorePosts,
    removeData: removePost,
  } = usePagination<Post, "getUserBookmarks", "posts">({
    Query: UserBookmarksQuery,
    onDataLoad(res) {
      return {
        data: res.getUserBookmarks.posts,
        areThereMore: res.getUserBookmarks.areThereMore,
      };
    },
  });

  const { userData } = useUserData();

  return {
    posts,
    isLoading,
    error,
    areThereMorePosts,
    loadMorePosts,
    removePost,
    bookmarksLength: userData?.bookmarks.length ?? 0,
  };
}
