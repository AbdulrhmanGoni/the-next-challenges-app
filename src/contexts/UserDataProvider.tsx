"use client"
import useGraphqlQuery from "@/hooks/useGraphqlQuery";
import bookmarkPostActionLogic from "@/lib/bookmarkPostActionLogic";
import { gql } from "@apollo/client";
import { createContext } from "react";

const USER_DATA_QUERY = gql`
  query UserData {
    userData {
      id
      firstName
      lastName
      headline
      avatar {
        id
        src
      }
      email
      role
      bookmarks
    }
  }
`;

type UserDataState = {
  userData: User | null;
  isLoading: boolean;
  updateUserDataStateActions: UpdateUserDataStateActionsObj
  requestDone: boolean;
  error?: Error;
}

type UpdateUserDataStateActionsObj = {
  bookmarkPostAction: (postId: Post["id"]) => void
}

export const UserDataContext = createContext<UserDataState>({
  userData: null,
  updateUserDataStateActions: {
    bookmarkPostAction() { },
  },
  isLoading: false,
  requestDone: false,
});

export default function UserDataProvider({ children }: React.PropsWithChildren) {

  const userDataState = useGraphqlQuery<{ userData: User }>(USER_DATA_QUERY);

  function bookmarkPostAction(postId: Post["id"]) {
    userDataState.setData(bookmarkPostActionLogic(postId))
  }

  return (
    <UserDataContext.Provider
      value={{
        ...userDataState,
        userData: userDataState.data?.userData || null,
        updateUserDataStateActions: {
          bookmarkPostAction,
        },
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
}