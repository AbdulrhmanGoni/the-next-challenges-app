import getHomePagePosts from "@/lib/getHomePagePosts";
import HomePagePostsGridError from "./HomePagePostsGridError";
import PostsGridContainer from "../PostsGridContainer";

export default async function HomePagePostsGrid() {

    try {
        const posts = await getHomePagePosts();
        return (
            <PostsGridContainer>
                {
                    posts.map((post) => (
                        <div key={post.id} className="grid">
                            {/* `PostCard` component here to display a post  */}
                        </div>
                    ))
                }
            </PostsGridContainer>
        )
    } catch {
        return <HomePagePostsGridError />
    }
}
