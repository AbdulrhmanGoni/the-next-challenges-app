import useGraphqlMutation from "@/hooks/useGraphqlMutation";
import { gql } from "@apollo/client";
import { useForm } from "react-hook-form";
import usePostComments from "./usePostComments";
import useUserData from "./useUserData";

type FormSchema = { comment: string };
type AddCommentActionResponse = { addCommentToPost: string };

const addCommentToPostMutation = gql`
  mutation AddComment($postId: MongoObjectId!, $comment: String!) {
    addCommentToPost(postId: $postId, comment: $comment)
  }
`;

export default function useAddCommentToPost({ postId }: PropsWithPostId) {
  const form = useForm<FormSchema>();

  const { addComment } = usePostComments();

  const { state, action, isLoading } = useGraphqlMutation<
    string,
    AddCommentActionResponse
  >();

  const { userData } = useUserData();

  function onSubmit(data: FormSchema) {
    if (userData) {
      const variables = {
        comment: data.comment,
        postId,
      };

      action({
        variables,
        query: addCommentToPostMutation,
        onSuccess: (res) => {
          form.setValue("comment", "");
          addComment({
            id: res.addCommentToPost,
            comment: data.comment,
            commenterId: userData.id,
            upvotes: 0,
            downvotes: 0,
            createdAt: new Date().getTime(),
            owner: {
              firstName: userData.firstName,
              lastName: userData.lastName,
              headline: userData.headline,
              avatar: userData.avatar,
            },
          });
        },
      });
    }
  }

  return { form, onSubmit, isLoading, state };
}
