"use client"
import PostsGridContainer from "../PostsGridContainer";
import PostCard from "../post-card/PostCard";
import useUserFeeds from "@/hooks/useUserFeeds";
import PostLoadingCard from "../post-card/PostLoadingCard";
import Alert from "../Alert";

export default function UserFeedsInfiniteScrollGrid() {

    const {
        posts,
        isLoading,
        error,
        loadMoreRef,
        paginationModel,
        areThereMorePosts,
    } = useUserFeeds()

    return (
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
                Array.from(new Array(Math.min(paginationModel.pageSize, 10))).map((_num, i) => (
                    <div key={i} className="grid">
                        <PostLoadingCard />
                    </div>
                ))
            }
            {
                error && !isLoading &&
                <Alert
                    variant="error"
                    message="خطأ غير متوقع حدث اثناء جلب المنشورات"
                    className="col-span-full"
                />
            }
            {
                areThereMorePosts && !isLoading && !error &&
                <span ref={loadMoreRef} className="p-2 col-span-full" />
            }
        </PostsGridContainer>
    )
}
