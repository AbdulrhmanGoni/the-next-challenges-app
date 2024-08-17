"use client"
import UserBookmarksEmptyMessage from './UserBookmarksEmptyMessage';
import UserBookmarks from './UserBookmarks';
import useUserData from '@/hooks/useUserData';
import UserCannotHaveBookmarksMessage from './UserCannotHaveBookmarksMessage';

export default function UserBookmarksContainerPage() {

  const { userData, isLoading, requestDone } = useUserData();

  return (
    userData ?
      !isLoading && userData.bookmarks.length === 0 ?
        <UserBookmarksEmptyMessage /> : <UserBookmarks />
      : requestDone && <UserCannotHaveBookmarksMessage />
  )
}
