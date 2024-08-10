import useGraphqlMutation from "@/hooks/useGraphqlMutation";
import { gql } from "@apollo/client";
import { useState } from "react";
import useUserData from "./useUserData";

const UpvotePostMutation = gql`
  mutation UpvotePost($postId: MongoObjectId!) {
    upvotePost(postId: $postId)
  }
`;

const DownvotePostMutation = gql`
  mutation DownvotePost($postId: MongoObjectId!) {
    downvotePost(postId: $postId)
  }
`;

export default function useVotePost({ post }: { post: Post }) {
  const { userData } = useUserData();

  const [avarageVotes, setAvarageVotes] = useState(
    post.upvotes - post.downvotes
  );
  const [currentUserVote, setCurrentUserVote] = useState(post.userVote);

  const { action, isLoading, state } = useGraphqlMutation<
    string,
    {
      upvotePost: boolean;
      downvotePost: boolean;
    }
  >();

  function upvotePost() {
    if (userData) {
      action({
        query: UpvotePostMutation,
        variables: { postId: post.id },
        onSuccess() {},
      });

      setCurrentUserVote((vote) => {
        if (vote === "upvote") {
          setAvarageVotes((votes) => --votes);
          return null;
        }
        setAvarageVotes((votes) => ++votes);
        return "upvote";
      });
    }
  }

  function downvotePost() {
    if (userData) {
      action({
        query: DownvotePostMutation,
        variables: { postId: post.id },
        onSuccess() {},
      });

      setCurrentUserVote((vote) => {
        if (vote === "downvote") {
          setAvarageVotes((votes) => ++votes);
          return null;
        }
        setAvarageVotes((votes) => --votes);
        return "downvote";
      });
    }
  }

  return {
    upvotePost,
    downvotePost,
    isLoading,
    state,
    avarageVotes,
    currentUserVote,
    userIsLogged: !!userData,
  };
}
