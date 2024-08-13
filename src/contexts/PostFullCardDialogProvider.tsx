"use client"
import PostAuthor from "@/components/post-card/PostAuthor";
import PostBookmark from "@/components/post-card/PostBookmark";
import PostPublishDate from "@/components/post-card/PostPublishDate";
import PostResourcesList from "@/components/post-card/PostResourcesList";
import PostTagsDisplayer from "@/components/post-card/PostTagsDisplayer";
import PostVotes from "@/components/post-card/PostVotes";
import PostCommentsSection from "@/components/post-comments-section/PostCommentsSection";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/shadcn-ui/dialog";
import { LinkIcon } from "lucide-react";
import Image from "next/image";
import {
  createContext,
  PropsWithChildren,
  useState
} from "react";

type PostFullCardProviderValue = {
  open: (post: Post, scrollToCommentsSection?: boolean) => void;
}

export const PostFullCardDialogContext = createContext<PostFullCardProviderValue>({
  open(_post, _scrollToCommentsSection) { },
});

export default function PostFullCardDialogProvider({ children }: PropsWithChildren) {

  const [post, setPost] = useState<Post>();
  const [isOpen, setIsOpen] = useState(false);
  const [scrollToCommentsSection, setScrollToCommentsSection] = useState(false);

  function open(post: Post, scrollToCommentsSection?: boolean) {
    setIsOpen(!!post);
    setPost(post);
    setScrollToCommentsSection(!!scrollToCommentsSection);
  }

  function close() {
    setIsOpen(false);
    setPost(undefined);
    setScrollToCommentsSection(false)
  }

  return (
    <PostFullCardDialogContext.Provider value={{ open }}>
      {children}
      {
        isOpen && post &&
        <Dialog open>
          <DialogContent
            onOverlayClick={close}
            onClose={close}
            className="max-h-[700px] sm:min-w-[600px] overflow-y-auto p-4"
            ref={(elem) => {
              if (scrollToCommentsSection) {
                elem?.scrollBy({ top: elem?.clientHeight })
              }
            }}
          >
            <DialogHeader className="gap-2">
              <Image
                src={post.thumbnail.src}
                alt="Post thumbnail"
                width={600}
                height={400}
              />
              <DialogTitle className="text-2xl">{post.title}</DialogTitle>
              <DialogDescription className="text-md">
                {post.body}
              </DialogDescription>
              <PostPublishDate
                className="text-md"
                publishDate={post.publishedAt}
                displayFullDate
              />
            </DialogHeader>
            <PostTagsDisplayer tags={post.tags} displayAllTags />

            <PostAuthor author={post.author} />

            <div className="flex items-center justify-between py-4">
              <PostVotes post={post} />
              <PostBookmark postId={post.id} />
            </div>

            <h3 className="text-lg mt-3 flex gap-2 items-center">
              <LinkIcon size={19} />
              المصادر
            </h3>
            <PostResourcesList resources={post.resources} />

            <h3 className="text-lg mt-3">
              التعليقات
              <span className="ms-2">( {post.commentsCount} )</span>
            </h3>
            <PostCommentsSection
              postId={post.id}
              postCommentsCount={post.commentsCount}
            />
          </DialogContent>
        </Dialog>
      }
    </PostFullCardDialogContext.Provider >
  )
}