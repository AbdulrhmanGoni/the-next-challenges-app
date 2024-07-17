type Post = {
  id: string;
  title: string;
  body: string;
  thumbnail: PostThumbnail;
  publishedAt: number;
  userVote: usersVotes;
  authorId: string;
  category: string;
  tags: string[];
  upvotes: number;
  downvotes: number;
  resources: PostResource[];
  commentsCount: number;
};

type usersVotes = "upvote" | "downvote" | null;

type User = {
  firstName: string;
  lastName: string;
  headline: string;
  email: string;
  avatar: string;
  role: string;
  bookmarks: Post["id"][];
};

type PostResource = {
  title: string;
  type: string;
  link: string;
};

type PostThumbnail = {
  src: string;
};

type PostComment = {
  id: string;
  commenterId: string;
  comment: string;
  createdAt: number;
  upvotes: number;
  downvotes: number;
};

type PaginationOptions = {
  page: number;
  pageSize: number;
};
