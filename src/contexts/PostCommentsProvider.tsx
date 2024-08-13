import React, { createContext, PropsWithChildren } from 'react'
import usePostCommentsPagination from '@/hooks/usePostCommentsPagination';

type PostCommentsContextType = {
    postId: Post["id"];
    comments: PostComment[];
    areThereMoreComments: boolean,
    isLoading: boolean,
    error?: string,
    addComment: (comment: PostComment) => void;
    removeComment: (commentId: PostComment["id"]) => void;
    loadMoreComments: () => void;
    paginationModel: PaginationModel
}

export const PostCommentsContext = createContext<PostCommentsContextType>({
    postId: "",
    comments: [],
    isLoading: false,
    areThereMoreComments: true,
    error: "",
    addComment() { },
    removeComment() { },
    loadMoreComments() { },
    paginationModel: { page: 1, pageSize: 1 }
})

type PostCommentsProviderProps = PropsWithChildren<{
    postId: Post["id"];
    postCommentsCount: number
}>

export default function PostCommentsProvider({ children, postId, postCommentsCount }: PostCommentsProviderProps) {

    const {
        comments,
        areThereMoreComments,
        isLoading,
        error,
        addComment,
        removeComment,
        loadMoreComments,
        paginationModel
    } = usePostCommentsPagination({ postId, postCommentsCount });

    return (
        <PostCommentsContext.Provider
            value={{
                postId,
                comments,
                areThereMoreComments,
                isLoading,
                error,
                addComment,
                removeComment,
                loadMoreComments,
                paginationModel
            }}
        >
            {children}
        </PostCommentsContext.Provider>
    )
}
