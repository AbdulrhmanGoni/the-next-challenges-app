import { PostFullCardDialogContext } from "@/contexts/PostFullCardDialogProvider";
import { useContext } from "react";

export default function usePostFullCardDialog() {
  return useContext(PostFullCardDialogContext);
}
