"use client"
import useGraphqlQuery from "@/hooks/useGraphqlQuery";
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
  updateUserDataStateActions: UserDataStateActions
  requestDone: boolean;
  error?: Error;
}

type UserDataStateActions = {}

export const UserDataContext = createContext<UserDataState>({
  userData: null,
  updateUserDataStateActions: {},
  isLoading: false,
  requestDone: false,
});

export default function UserDataProvider({ children }: React.PropsWithChildren) {

  const userDataState = useGraphqlQuery<{ userData: User }>(USER_DATA_QUERY);

  return (
    <UserDataContext.Provider
      value={{
        ...userDataState,
        userData: userDataState.data?.userData || null,
        updateUserDataStateActions: {},
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
}