import { Suspense } from "react";
import AppLayout from "./AppLayout";
import HomePagePostsGrid from "@/components/hompage/HomePagePostsGrid";
import PostsGridLoading from "@/components/PostsGridLoading";

export default function Home() {
  return (
    <AppLayout>
      <Suspense fallback={<PostsGridLoading loadingCardsCount={6} />}>
        <HomePagePostsGrid />
      </Suspense>
    </AppLayout>
  );
}