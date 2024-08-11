import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import PostCommentCard from "./PostCommentCard";
import usePostComments from "@/hooks/usePostComments";
import PostLoadingCommentCard from "./PostLoadingCommentCard";
import { useEffect } from "react";

const DEFAULT_LOADING_COMMENTS_CARDS = 4;

export default function PostCommentsDisplayer({ postCommentsCount }: { postCommentsCount: number }) {

  const {
    comments,
    isLoading,
    error,
    loadMoreComments,
    areThereMoreComments,
    paginationModel,
  } = usePostComments();

  const { ref, isIntersecting } = useIntersectionObserver();
  useEffect(() => {
    if (isIntersecting) {
      loadMoreComments();
    }
  }, [isLoading, isIntersecting])

  const loadingCardsCount = Math.min(
    postCommentsCount,
    paginationModel.pageSize,
    DEFAULT_LOADING_COMMENTS_CARDS,
  )

  return (
    <>
      <div className="flex flex-col gap-3">
        {
          comments.map((comment) => (
            <PostCommentCard
              key={comment.id}
              comment={comment}
            />
          ))
        }
        {
          !isLoading &&
          !comments.length &&
          <p className="text-md text-center p-4">لا توجد تعليقات</p>
        }
        {
          isLoading &&
          <div className="p-4 flex flex-col gap-3 w-full">
            {Array.from(new Array(loadingCardsCount)).map((_n, i) => (
              <PostLoadingCommentCard key={i} />
            ))}
          </div>
        }
      </div>
      {
        areThereMoreComments && !error &&
        <span ref={ref} className="p-1 flex justify-center w-full"></span>
      }
      {
        error &&
        <p className="text-destructive">{error}</p>
      }
    </>
  )
}
