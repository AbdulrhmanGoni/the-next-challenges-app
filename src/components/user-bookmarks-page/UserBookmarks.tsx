"use client"
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import useUserBookmarks from "@/hooks/useUserBookmarks";
import PostLoadingCard from "../post-card/PostLoadingCard";
import PostCard from "../post-card/PostCard";
import PostsGridContainer from "../PostsGridContainer";

export default function UserBookmarks() {
  const {
    posts,
    isLoading,
    areThereMorePosts,
    loadMorePosts,
    bookmarksLength,
    error
  } = useUserBookmarks();

  const { ref } = useIntersectionObserver({
    onChange(isIntersecting) {
      if (isIntersecting) loadMorePosts();
    },
  });

  return (
    <>
      <PostsGridContainer>
        {
          posts.map((post) => (
            <div key={post.id} className="grid">
              <PostCard post={post} />
            </div>
          ))
        }
        {
          isLoading &&
          Array.from(new Array(Math.min(10, bookmarksLength))).map((_num, i) => (
            <div key={i} className="grid">
              <PostLoadingCard />
            </div>
          ))
        }
      </PostsGridContainer>
      {
        areThereMorePosts && !isLoading && !error &&
        <span ref={ref} className="p-1 flex justify-center w-full"></span>
      }
    </>
  )
}
