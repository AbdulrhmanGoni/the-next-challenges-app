import { useContext } from "react";
import { UserDataContext } from "@/app/UserDataProvider";

export default function useUserData() {
  return useContext(UserDataContext);
}
