import { useEffect, useState } from "react";
import useUserData from "./useUserData";
import useGraphqlMutation from "@/hooks/useGraphqlMutation";
import { gql } from "@apollo/client";

const BookmarkPostMutation = gql`
  mutation Bookmark($postId: MongoObjectId!) {
    bookmarkPost(postId: $postId)
  }
`;

export default function usePostBookmark({ postId }: PropsWithPostId) {
  const { userData, updateUserDataStateActions } = useUserData();
  const [isPostBookmarked, setIsPostBookmarked] = useState(false);
  const { action } = useGraphqlMutation<string, { bookmarkPost: boolean }>();

  function bookmarkPost() {
    if (userData) {
      action({
        query: BookmarkPostMutation,
        variables: { postId },
        onSuccess(_res) {},
      });
      updateUserDataStateActions.bookmarkPostAction(postId);
      setIsPostBookmarked(!isPostBookmarked);
    }
  }

  useEffect(() => {
    if (userData?.bookmarks.length) {
      setIsPostBookmarked(userData.bookmarks.some((id) => id === postId));
    }
  }, [userData?.bookmarks]);

  return {
    isPostBookmarked,
    bookmarkPost,
  };
}
