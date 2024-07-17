import PostLoadingCard from "./post-card/PostLoadingCard";
import PostsGridContainer from "./PostsGridContainer";

export default function PostsGridLoading({ loadingCardsCount }: { loadingCardsCount: number }) {
    return (
        <PostsGridContainer>
            {Array.from(new Array(loadingCardsCount)).map((_num, i) => (
                <div key={i} className="grid">
                    <PostLoadingCard />
                </div>
            ))}
        </PostsGridContainer>
    )
}