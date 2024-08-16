"use client"
import { createContext, useEffect } from "react";
import usePagination from "../hooks/usePagination";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import {
    defaultUserFeedsPaginationModel,
    getPostsQuery,
} from "@/graphql/UserFeedsQuery";

type UserFeedsPostsState = {
    posts: Post[];
    isLoading: boolean;
    error: string;
    loadMoreRef: (node?: Element | null) => void;
    paginationModel: PaginationModel;
    addPost: (data: Post) => void;
    updatePost: (select: (data: Post) => boolean, update: (data: Post) => Post) => void,
    removePost: (select: (data: Post) => boolean) => void;
    areThereMorePosts: boolean;
}

export const UserFeedsPostsContext = createContext<UserFeedsPostsState>({
    posts: [],
    isLoading: false,
    error: "",
    loadMoreRef: (_node?: Element | null) => { },
    paginationModel: defaultUserFeedsPaginationModel,
    addPost: (_data: Post) => { },
    updatePost: (_select: (data: Post) => boolean, _update: (data: Post) => Post) => { },
    removePost: (_select: (data: Post) => boolean) => { },
    areThereMorePosts: true,
});

export default function UserFeedsPostsProvider(
    { children, firstFeedsFetch }:
        React.PropsWithChildren<{ firstFeedsFetch: UserFeedsResponse }>
) {

    const {
        data: posts,
        isLoading,
        error,
        loadMore: loadMorePosts,
        paginationModel,
        addData: addPost,
        updateData: updatePost,
        removeData: removePost,
        areThereMoreData: areThereMorePosts,
    } = usePagination<Post, "userFeeds", "posts">({
        Query: getPostsQuery,
        variables: {},
        onDataLoad(res) {
            return {
                data: res.userFeeds.posts,
                areThereMore: res.userFeeds.areThereMore,
            };
        },
        defaultValues: {
            data: firstFeedsFetch?.posts,
            areThereMoreData: firstFeedsFetch?.areThereMore,
            paginationModel: defaultUserFeedsPaginationModel,
        },
        options: { skipFirstPageFetch: true },
    });

    const { ref, isIntersecting } = useIntersectionObserver();
    useEffect(() => {
        if (isIntersecting) {
            loadMorePosts();
        }
    }, [isLoading, isIntersecting]);

    return (
        <UserFeedsPostsContext.Provider
            value={{
                posts,
                isLoading,
                error,
                loadMoreRef: ref,
                paginationModel,
                addPost,
                updatePost,
                removePost,
                areThereMorePosts,
            }}
        >
            {children}
        </UserFeedsPostsContext.Provider>
    );
}