import { PostCommentsContext } from "@/contexts/PostCommentsProvider"
import { useContext } from "react"

export default function usePostComments() {
    return useContext(PostCommentsContext)
}
