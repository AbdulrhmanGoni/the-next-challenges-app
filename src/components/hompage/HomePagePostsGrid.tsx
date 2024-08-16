import getHomePagePosts from "@/lib/getHomePagePosts";
import HomePagePostsGridError from "./HomePagePostsGridError";
import UserFeedsInfiniteScrollGrid from "./UserFeedsInfiniteScrollGrid";
import UserFeedsPostsProvider from "@/contexts/UserFeedsPostsProvider";

export default async function HomePagePostsGrid() {
    try {
        const firstFeedsFetch = await getHomePagePosts();
        return (
            <UserFeedsPostsProvider firstFeedsFetch={firstFeedsFetch}>
                <UserFeedsInfiniteScrollGrid />
            </UserFeedsPostsProvider>
        )
    } catch {
        return <HomePagePostsGridError />
    }
}
