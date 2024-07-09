"use client"
import useGraphqlQuery from "@/lib/hooks/useGraphqlQuery";
import { gql } from "@apollo/client";
import { createContext } from "react";

const USER_DATA_QUERY = gql`
  query UserData {
    userData {
      firstName
      lastName
      headline
      avatar
      email
      role
      bookmarks
    }
  }
`;

type UserDataState = {
  userData: User | null;
  isLoading: boolean;
  error?: Error;
}

export const UserDataContext = createContext<UserDataState>({ userData: null, isLoading: false });

export default function UserDataProvider({ children }: React.PropsWithChildren) {

  const userDataState = useGraphqlQuery<{ userData: User }>(USER_DATA_QUERY);

  return (
    <UserDataContext.Provider
      value={{ ...userDataState, userData: userDataState.data?.userData || null }}
    >
      {children}
    </UserDataContext.Provider>
  );
}