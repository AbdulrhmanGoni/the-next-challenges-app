import { UserFeedsPostsContext } from "@/contexts/UserFeedsPostsProvider";
import { useContext } from "react";

export default function useUserFeeds() {
  const { removePost, updatePost, ...rest } = useContext(UserFeedsPostsContext);

  return {
    ...rest,
    removePost(postId: Post["id"]) {
      removePost((post) => post.id === postId);
    },
    updatePost(postId: Post["id"], updateFn: (data: Post) => Post) {
      updatePost((post) => post.id === postId, updateFn);
    },
  };
}
