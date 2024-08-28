import useGraphqlMutation from "@/hooks/useGraphqlMutation";
import { gql } from "@apollo/client";
import useSonnerToast from "./useSonnerToast";

const PublishPostMutation = gql`
  mutation PublishPost($post: CreatePostInput!) {
    publishPost(createPostInput: $post)
  }
`;

export type CreatePostInput = {
  title: string;
  category: string;
  body: string;
  thumbnail: PostThumbnail;
  tags: string[];
  resources: PostResource[];
};

export default function usePublishPost() {
  const { isLoading, state, action } = useGraphqlMutation<
    CreatePostInput,
    { createPost: boolean }
  >();
  const toast = useSonnerToast();

  function publishPost(
    post: CreatePostInput,
    onSuccess?: (res: { createPost: boolean }) => void
  ) {
    action({
      query: PublishPostMutation,
      variables: { post },
      onSuccess(res) {
        toast({
          title: "نشر ناجح",
          description: "المنشور الذي كتبته تم نشره بنجاح",
          variant: "success",
        });
        onSuccess?.(res);
      },
    });
  }

  return {
    isLoading,
    state,
    publishPost,
  };
}
