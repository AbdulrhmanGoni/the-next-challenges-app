import useGraphqlMutation from "@/hooks/useGraphqlMutation";
import { gql } from "@apollo/client";
import usePostComments from "./usePostComments";

const RemovePostCommentMutation = gql`
  mutation RemovePostComment(
    $postId: MongoObjectId!
    $commentId: MongoObjectId!
  ) {
    removeCommentFromPost(postId: $postId, commentId: $commentId)
  }
`;

export default function useRemovePostComment() {
  const { action, isLoading, state } = useGraphqlMutation<
    string,
    { removeCommentFromPost: boolean }
  >();

  const { postId, removeComment } = usePostComments();

  function removePostComment(commentId: PostComment["id"]) {
    action({
      query: RemovePostCommentMutation,
      variables: { postId, commentId },
      onSuccess() {
        removeComment(commentId);
      },
    });
  }

  return {
    removePostComment,
    isLoading,
    state,
  };
}
