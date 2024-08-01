import { useContext } from "react";
import { UserDataContext } from "@/contexts/UserDataProvider";

export default function useUserData() {
  return useContext(UserDataContext);
}
