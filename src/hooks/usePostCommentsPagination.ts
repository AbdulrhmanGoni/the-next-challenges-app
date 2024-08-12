import { gql } from "@apollo/client";
import usePagination from "./usePagination";

const getPostCommentsQuery = gql`
  query GetPostComments(
    $postId: MongoObjectId!
    $paginationOptions: PaginationOptions!
  ) {
    getPostComments(postId: $postId, paginationOptions: $paginationOptions) {
      comments {
        id
        comment
        commenterId
        createdAt
        upvotes
        downvotes
        owner {
          firstName
          lastName
          headline
          avatar {
            id
            src
          }
        }
      }
      areThereMore
    }
  }
`;

export default function usePostCommentsPagination({
  postId,
  postCommentsCount,
}: PropsWithPostId<{ postCommentsCount: number }>) {
  const {
    data: comments,
    isLoading,
    error,
    loadMore: loadMoreComments,
    paginationModel,
    addData: addComment,
    removeData: removeComment,
    areThereMoreData: areThereMoreComments,
  } = usePagination<PostComment, "getPostComments", "comments">({
    Query: getPostCommentsQuery,
    variables: { postId },
    onDataLoad(res) {
      return {
        data: res.getPostComments.comments,
        areThereMore: res.getPostComments.areThereMore,
      };
    },
    defaultValues: {
      areThereMoreData: !!postCommentsCount,
    },
  });

  return {
    comments,
    isLoading,
    error,
    loadMoreComments,
    paginationModel,
    addComment,
    removeComment,
    areThereMoreComments,
  };
}
